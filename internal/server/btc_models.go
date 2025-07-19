package server

type UTXO struct {
	TxID         string  `json:"txid"`
	Vout         int     `json:"vout"`
	Amount       float32 `json:"amount"`
	Height       int     `json:"height"`
	Pubkey       string  `json:"scriptPubKey"`
	Confirations int     // this is not a part of the UTXO, we can get it by subtracting the current block height from the height of the UTXO
	Title        string  // this is retrieved from the database, it is not a part of the UTXO, it is a titled set by the user
}
