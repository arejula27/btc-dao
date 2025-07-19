import api from './api';

export interface KeyStatus {
	name: string;
	role: string;
	status: 'verified' | 'lost' | 'warning';
	daysAgo: number;
}

export interface UTXO {
	title: string;
	description: string;
	btc: string;
	eur: string;
	txId: string;
	output: number;
	address: string;
	confirmations: number;
}

export const fetchBalance = async (): Promise<{ totalBtc: string; totalEur: string }> => {
	const { data } = await api.get('/btc/balance');
	return data;
};

export const fetchUTXOsList = async (): Promise<UTXO[]> => {
	const { data } = await api.get('/btc/getUTXOs');
	console.log('UTXO data:', data);

	// This will retrieve a list with:
	// [{"txid":"cdeca086048a5747c0301e8481f7eb9c2baebf8863b26b4a6c5001e1b6b5809e","vout":0,"amount":5,"height":122,"scriptPubKey":"5120ba0ba9e6fbb75fc3d6e5471c0664d40863ee0a13ca5a82f4ba90ddd09e094575"},... ]

	const utxos: UTXO[] = data.map((utxo: any) => ({
		title: `UTXO ${utxo.txid.substring(0, 8)}...`,
		description: `Output #${utxo.vout} at height ${utxo.height}`,
		btc: utxo.amount.toFixed(8),
		eur: (utxo.amount * 50000).toFixed(2), // Assuming a conversion rate of 50000 EUR/BTC
		txId: utxo.txid,
		output: utxo.vout,
		address: utxo.scriptPubKey,
		confirmations: 6 // Placeholder for confirmations
	}));
	return utxos;
}
