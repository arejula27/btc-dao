package server

type UTXO struct {
	TxID         string  `json:"txid"`
	Vout         int     `json:"vout"`
	Amount       float32 `json:"amount"`
	Height       int     `json:"height"`
	Pubkey       string  `json:"scriptPubKey"`
	Address      string  `json:"address"`       // this is not a part of the UTXO, it is derived from the pubkey
	Confirations int     `json:"confirmations"` // this is not a part of the UTXO, it is derived from the height of the UTXO and the current block height
	Title        string  `json:"title`          // this is retrieved from the database, it is not a part of the UTXO, it is a titled set by the user
}
