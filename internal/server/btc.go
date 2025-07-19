package server

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"sort"
)

type bitcoinClient struct {
	Username string // Username for RPC authentication
	Password string // Password for RPC authentication
	URL      string // URL of the Bitcoin RPC server
}

type RPCRequest struct {
	Jsonrpc string        `json:"jsonrpc"`
	ID      string        `json:"id"`
	Method  string        `json:"method"`
	Params  []interface{} `json:"params"`
}

type RPCResponse struct {
	Result json.RawMessage `json:"result"`
	Error  interface{}     `json:"error"`
	ID     string          `json:"id"`
}

func (bcli *bitcoinClient) callRPC(method string, params []interface{}) ([]byte, error) {

	reqBody := RPCRequest{
		Jsonrpc: "1.0",
		ID:      "btcwallet",
		Method:  method,
		Params:  params,
	}

	reqBytes, _ := json.Marshal(reqBody)
	req, err := http.NewRequest("POST", bcli.URL, bytes.NewBuffer(reqBytes))
	if err != nil {
		return nil, err
	}

	req.SetBasicAuth(bcli.Username, bcli.Password)
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var rpcResp RPCResponse
	if err := json.NewDecoder(resp.Body).Decode(&rpcResp); err != nil {
		return nil, err
	}
	if rpcResp.Error != nil {
		return nil, fmt.Errorf("rpc error: %v", rpcResp.Error)
	}

	return rpcResp.Result, nil
}

// GetBalance retrieves the balance of a Bitcoin wallet using the provided descriptor.
func (bcli *bitcoinClient) GetBalance(descriptor string) (float64, error) {
	// Call Bitcoin RPC to get balance
	result, err := bcli.callRPC("scantxoutset", []interface{}{"start", []interface{}{map[string]interface{}{"desc": descriptor, "range": []int{0, 1000}}}})
	if err != nil {
		return 0, err
	}

	var balanceInfo map[string]any
	if err := json.Unmarshal(result, &balanceInfo); err != nil {
		return 0, fmt.Errorf("failed to parse balance info: %w", err)
	}

	return balanceInfo["total_amount"].(float64), nil
}

func (bcli *bitcoinClient) DecodeScript(scriptPubKey string) (string, error) {
	// Call Bitcoin RPC to decode the script
	result, err := bcli.callRPC("decodescript", []interface{}{scriptPubKey})
	if err != nil {
		return "", err
	}

	var decodedScript map[string]interface{}
	if err := json.Unmarshal(result, &decodedScript); err != nil {
		return "", fmt.Errorf("failed to parse decoded script: %w", err)
	}

	// Extract the address from the decoded script
	address, ok := decodedScript["address"].(string)
	if !ok {
		return "", fmt.Errorf("address not found in decoded script")
	}

	return address, nil
}

// GetDescriptorUTXOs retrieves the UTXOs for a given descriptor.
func (bcli *bitcoinClient) GetDescriptorUTXOs(descriptor string) ([]UTXO, error) {
	// Call Bitcoin RPC to get UTXOs
	result, err := bcli.callRPC("scantxoutset", []interface{}{"start", []interface{}{map[string]interface{}{"desc": descriptor}}})
	if err != nil {
		return nil, err
	}

	type UTXOSetInfo struct {
		Unspents []UTXO `json:"unspents"`
		Height   int    `json:"height"`
	}
	var utxoSetInfo UTXOSetInfo
	if err := json.Unmarshal(result, &utxoSetInfo); err != nil {
		return nil, fmt.Errorf("failed to parse UTXO set info: %w", err)
	}

	utxoList := utxoSetInfo.Unspents

	// sort the unspents by height, first the most recent (highest height)
	sort.Slice(utxoList, func(i, j int) bool {
		return utxoList[i].Height > utxoList[j].Height
	})

	// Add address and confirmations to each

	for i := range utxoList {
		address, err := bcli.DecodeScript(utxoList[i].Pubkey)
		if err != nil {
			return nil, fmt.Errorf("failed to decode script for UTXO %s: %w", utxoList[i].TxID, err)
		}
		utxoList[i].Address = address
		utxoList[i].Confirations = utxoSetInfo.Height - utxoList[i].Height + 1
	}

	//TODO: retrieve titles from the database and add them to the UTXO

	return utxoList, nil
}
