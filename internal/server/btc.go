package server

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
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
		ID:      "btcbalance",
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
