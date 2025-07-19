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

	const utxos: UTXO[] = data.map((utxo: any) => ({
		title: `UTXO ${utxo.txid.substring(0, 8)}...`,
		description: `Output #${utxo.vout} at height ${utxo.height}`,
		btc: utxo.amount.toFixed(8),
		eur: "PLACEHOLDER", // Assuming a conversion rate of 50000 EUR/BTC
		txId: utxo.txid,
		output: utxo.vout,
		address: utxo.address,
		confirmations: utxo.confirmations // Placeholder for confirmations
	}));
	return utxos;
}
