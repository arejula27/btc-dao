package server

import (
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/labstack/echo/v4"
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

// TODO: Should i move the btc client logic to a separate package?
// maybe the server should call bcli.GetBalance(descripror) instead of managing btc logic

// GetBalanceHandler handles the request to get the balance of a Bitcoin wallet.
// It will obtain the user from the context, gather his descriptor from the database
func (s *Server) GetBalanceHandler(c echo.Context) error {

	// Gather from database
	descriptor := "tr([05ebc07a/86h/1h/0h]tpubDCCqg9reqruTFN8nhdZU7CyCJL17EGKWEjiyUrKWauothvMN4Rr1FFsnLG5ocaQQyD63ZnUfnfCLGWChYhd1QqgLVpo6PBNwejXRcSmyt2Y/<0;1>/*)#6v7wxu2x"

	// Call Bitcoin RPC to get balance
	result, err := s.bcli.callRPC("scantxoutset", []any{"start", []interface{}{map[string]interface{}{"desc": descriptor, "range": []int{0, 1000}}}})
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
	var balanceInfo map[string]any
	if err := json.Unmarshal(result, &balanceInfo); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "failed to parse balance info"})
	}

	// return the balance
	return c.JSON(http.StatusOK, map[string]float64{
		"balance": balanceInfo["total_amount"].(float64),
	})
}
