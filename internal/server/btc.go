package server

import (
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/labstack/echo/v4"
	"net/http"
)

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

func callRPC(method string, params []interface{}) ([]byte, error) {
	rpcUser := "admin1"
	rpcPassword := "123"
	url := "http://127.0.0.1:18443"

	reqBody := RPCRequest{
		Jsonrpc: "1.0",
		ID:      "btcbalance",
		Method:  method,
		Params:  params,
	}

	reqBytes, _ := json.Marshal(reqBody)
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(reqBytes))
	if err != nil {
		return nil, err
	}

	req.SetBasicAuth(rpcUser, rpcPassword)
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
func (s *Server) GetBalanceHandler(c echo.Context) error {

	// Gather from database
	descriptor := "tr([05ebc07a/86h/1h/0h]tpubDCCqg9reqruTFN8nhdZU7CyCJL17EGKWEjiyUrKWauothvMN4Rr1FFsnLG5ocaQQyD63ZnUfnfCLGWChYhd1QqgLVpo6PBNwejXRcSmyt2Y/<0;1>/*)#6v7wxu2x"
	result, err := callRPC("scantxoutset", []interface{}{"start", []interface{}{map[string]interface{}{"desc": descriptor, "range": []int{0, 1000}}}})
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
	var balanceInfo map[string]interface{}
	if err := json.Unmarshal(result, &balanceInfo); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "failed to parse balance info"})
	}

	return c.JSON(http.StatusOK, map[string]float64{
		"balance": balanceInfo["total_amount"].(float64),
	})
}
