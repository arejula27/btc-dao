import React from 'react';
import { Link } from 'react-router'; // Fixed to react-router-dom for v6+

interface KeyProof {
  name: string;
  role: string;
  key: string;
  status: 'verified' | 'lost' | 'warning';
  lastSigned: string;
}

interface UTXO {
  title: string;
  btc: string;
  eur: string;
  transactionId: string;
  output: number;
  address: string;
  confirmations: number;
}

const KeyOwnershipProofs: React.FC = () => {
  const keyProofs: KeyProof[] = [
    { name: 'alice_ceo', role: 'CEO', key: 'A1B2C3D4E5F6G7H8', status: 'verified', lastSigned: '13d ago' },
    { name: 'bob_cfo', role: 'CFO', key: 'E5F6G7H8I9J0K1L2', status: 'verified', lastSigned: '7d ago' },
    { name: 'eve_board', role: 'Board Member', key: 'Q7R8S9T0U1V2W3X4', status: 'lost', lastSigned: '542d ago' },
    { name: 'charlie_cto', role: 'CTO', key: 'I9J0K1L2M3N4O5P6', status: 'warning', lastSigned: '50d ago' },
    { name: 'diana_coo', role: 'COO', key: 'X5Y6Z7A8B9C0D1E2', status: 'verified', lastSigned: '8d ago' },
  ];

  const getStatusClasses = (status: KeyProof['status']) => {
    switch (status) {
      case 'verified':
        return 'bg-status-success text-text-default font-semibold';
      case 'lost':
        return 'bg-status-danger text-text-default font-semibold';
      case 'warning':
        return 'bg-status-warning text-text-default font-semibold';
      default:
        return 'bg-border-subtle text-text-subtle';
    }
  };

  return (
    <section className="p-6 rounded-2xl shadow-lg space-y-6 bg-background-default">
      <header className="flex items-center gap-3 mb-4">
        <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48..."></path>
        </svg>
        <div>
          <h2 className="text-primary text-xl font-bold">Key Ownership Proofs</h2>
          <p className="text-text-subtle text-sm">Verification history of each key holder</p>
        </div>
      </header>

      <div className="space-y-4">
        {keyProofs.map((proof, idx) => (
          <article
            key={idx}
            className="bg-background-card p-4 rounded-xl flex justify-between items-center hover:ring-1 hover:ring-primary transition-shadow"
            role="listitem"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-tertiary flex items-center justify-center text-background-default font-bold text-lg select-none">
                {proof.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-text-default font-semibold">{proof.name}</p>
                <p className="text-text-subtle text-sm">{proof.role}</p>
                <p className="text-text-subtle text-xs font-mono truncate max-w-xs">Key: {proof.key}</p>
              </div>
            </div>

            <div className="flex flex-col items-end text-right gap-1 min-w-[90px]">
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusClasses(proof.status)}`}>
                {proof.status}
              </span>
              <p className="text-text-subtle text-xs">Last signed: {proof.lastSigned}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

const UnspentTransactionOutputs: React.FC = () => {
  const utxos: UTXO[] = [
    { title: '2025 Q1 budget settlement', btc: 'B3.2547', eur: '€137,836.55', transactionId: 'a1b2c3...y5z6', output: 0, address: 'bc1qxy...0w1h', confirmations: 1247 },
    { title: '2024 Serie A', btc: 'B2.1234', eur: '€89,925.99', transactionId: 'b2c3d4...z6a1', output: 1, address: 'bc1qw6...f3t4', confirmations: 892 },
    { title: 'Marketing Campaign Q4', btc: 'B1.5000', eur: '€63,525.00', transactionId: 'c3d4e5...a1b2', output: 0, address: 'bc1qwe...ghjk', confirmations: 560 },
  ];

  return (
    <section className="p-6 rounded-2xl shadow-lg space-y-6 bg-background-default">
      <header className="flex items-center gap-3 mb-4">
        <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48..."></path>
        </svg>
        <div>
          <h2 className="text-primary text-xl font-bold">Unspent Transaction Outputs</h2>
          <p className="text-text-subtle text-sm">Labeled BTC outputs with details</p>
        </div>
      </header>

      {/* Final Total Amount card */}
      <div className="mb-6 border-b border-secondary pb-3">
        <p className="text-text-subtle uppercase tracking-wide text-xs font-semibold mb-1">
          Total Amount
        </p>
        <div>
          <p className="text-text-subtle text-3xl font-extrabold leading-tight">
            B12.5847
          </p>
          <p className="text-text-subtle text-sm font-medium mt-0.5">
            €532,962.04
          </p>
        </div>
      </div>

      <div className="space-y-4" role="list">
        {utxos.map((utxo, idx) => (
          <article
            key={idx}
            className="bg-background-card p-4 rounded-xl hover:ring-1 hover:ring-primary transition-shadow"
            role="listitem"
          >
            <h3 className="text-text-default font-semibold text-lg mb-2">{utxo.title}</h3>
            <div className="flex justify-between items-end mb-2">
              <p className="text-text-default text-xl font-bold">{utxo.btc}</p>
              <p className="text-text-subtle text-sm">{utxo.eur}</p>
            </div>
            <div className="text-text-subtle text-xs font-mono space-y-1 break-words">
              <p>TxID: {utxo.transactionId}</p>
              <p>Output: {utxo.output}</p>
              <p>Address: {utxo.address}</p>
              <p>
                Confirmations:{' '}
                <span className="text-status-success font-semibold">{utxo.confirmations}</span>
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

const HoldingsPage: React.FC = () => {
  return (
    <div className="min-h-screen p-8 font-sans text-text-default space-y-10 bg-background-main">
      <header className="flex items-center gap-4 mb-8">
        <Link to="/" className="text-text-subtle hover:text-primary transition">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span className="sr-only">Go back</span>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-primary">Bitcoin Treasury</h1>
          <p className="text-sm text-text-subtle">Key Ownership & UTXO Management</p>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <KeyOwnershipProofs />
        <UnspentTransactionOutputs />
      </main>
    </div>
  );
};

export default HoldingsPage;
