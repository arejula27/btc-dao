import { Link } from 'react-router';
interface KeyStatus {
  name: string;
  role: string;
  status: 'verified' | 'expired' | 'warning';
  daysAgo: number;
}

interface UTXO {
  title: string;
  description: string;
  btc: string;
  eur: string;
  txId: string;
  output: number;
  address: string;
  confirmations: number;
}

const keyStatuses: KeyStatus[] = [
  { name: 'alice_ceo', role: 'CEO', status: 'verified', daysAgo: 536 },
  { name: 'bob_cfo', role: 'CFO', status: 'verified', daysAgo: 537 },
  { name: 'charlie_cto', role: 'CTO', status: 'warning', daysAgo: 540 },
  { name: 'diana_coo', role: 'COO', status: 'verified', daysAgo: 538 },
  { name: 'eve_board', role: 'Board Member', status: 'expired', daysAgo: 542 },
];

const utxos: UTXO[] = [
  {
    title: 'Q1 Settlement',
    description: 'Quarterly settlement and operational expenses',
    btc: '₿3.2547',
    eur: '€137,836.55',
    txId: 'a1b2c3d4e5f6...u1v2w3x4y5z6',
    output: 0,
    address: 'bc1qxy2kgdyg...83kkfjhx0w1h',
    confirmations: 1247,
  },
  {
    title: 'Vendor Payments',
    description: 'Outstanding vendor and contractor payments',
    btc: '₿2.1234',
    eur: '€89,925.99',
    txId: 'b2c3d4e5f6g7...v2w3x4y5z6a1',
    output: 1,
    address: 'bc1qw508d6qe...c5xw7kv8f3t4',
    confirmations: 892,
  },
  {
    title: 'Strategic Reserve',
    description: 'Long-term strategic treasury reserve',
    btc: '₿4.7856',
    eur: '€202,670.16',
    txId: 'c3d4e5f6g7h8...w3x4y5z6a1b2',
    output: 0,
    address: 'bc1qrp33q0q5...ysxf3qccfmy3',
    confirmations: 2156,
  },
  {
    title: 'Operational Buffer',
    description: 'Buffer for unexpected operational costs',
    btc: '₿1.8765',
    eur: '€79,469.78',
    txId: 'd4e5f6g7h8i9...x4y5z6a1b2c3',
    output: 2,
    address: 'bc1qm341sc65...e3ewf0j77s3h',
    confirmations: 567,
  },
  {
    title: 'Contingency Fund',
    description: 'Emergency contingency allocation',
    btc: '₿0.5445',
    eur: '€23,059.58',
    txId: 'e5f6g7h8i9j0...y5z6a1b2c3d4',
    output: 1,
    address: 'bc1qklwj3mkf...w8f9x0y1z2a3',
    confirmations: 1834,
  },
];

const statusColors = {
  verified: 'bg-green-100 text-green-800',
  expired: 'bg-red-100 text-red-800',
  warning: 'bg-yellow-100 text-yellow-800',
};

const Dashboard = () => {
  const totalBtc = '₿12.5847';
  const totalEur = '€532,962.04';
  const utxoCount = 5;
  const verifiedCount = keyStatuses.filter(k => k.status === 'verified').length;
  const totalKeys = keyStatuses.length;

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans max-w-7xl mx-auto">
      {/* Header 
      <header className="flex items-center gap-3 border-b border-gray-200 pb-4 mb-8">
        <div className="flex items-center justify-center w-10 h-10 rounded-md bg-orange-100 text-orange-600 font-bold text-xl">₿</div>
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Bitcoin Treasury</h1>
          <p className="text-sm text-gray-500">Key Ownership &amp; UTXO Management</p>
        </div>
      </header>*/}
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

      {/* Summary cards */}
      <section className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-background-card p-6 rounded-lg shadow border border-gray-200 flex flex-col justify-between">
          <p className="text-sm text-text-subtle mb-1">Total Bitcoin</p>
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold text-2xl text-text-default">{totalBtc}</h2>
          </div>
          <p className="text-text-subtle mt-1">{totalEur}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">UTXOs</p>
          <h2 className="font-extrabold text-2xl">{utxoCount}</h2>
          <p className="text-gray-500 mt-1">Available outputs</p>
        </div>



        <div className="bg-white p-6 rounded-lg shadow border border-gray-200 ">
          {/* Text content */}
          <div className="flex justify-between items-center">
            <div className="flex flex-col justify-between">
              <p className="text-sm text-gray-500 mb-1">Key Status</p>
              <h2 className="font-extrabold text-2xl">{verifiedCount}/{totalKeys}</h2>
              <p className="text-gray-500 mt-1">Keys verified</p>
            </div>

            {/* Red warning triangle icon */}
            <div className="ml-6 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="h-16 w-16 text-red-500"
                fill="currentColor"
              >
                <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480L40 480c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24s24-10.7 24-24l0-112c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
              </svg>
            </div>
          </div>
          <div className='text-status-danger font-bold'>
            <p >Danger of losing access to funds</p>
            <p>3 keys required to maintain access.</p>
          </div>
        </div>
      </section >

      {/* Key Ownership Status */}
      < section className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-8" >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-primary flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.38 0 2.5-1.12 2.5-2.5S13.38 6 12 6 9.5 7.12 9.5 8.5 10.62 11 12 11z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12v4a4 4 0 008 0v-4" />
            </svg>
            Key Ownership Status
            <span className="ml-3 px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
              {verifiedCount}/{totalKeys} verified
            </span>
          </h2>
          <button className="text-gray-500 hover:text-gray-700 focus:outline-none">Expand</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {keyStatuses.map(({ name, role, status, daysAgo }) => (
            <div key={name} className="border border-gray-200 rounded-md p-4 flex items-center justify-between">
              <div>
                <p className="text-gray-700 font-semibold">{name}</p>
                <p className="text-gray-500 text-sm">{role}</p>
              </div>
              <div className="text-right">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColors[status]}`}>
                  {status}
                </span>
                <p className="text-gray-400 text-xs mt-1">{daysAgo}d ago</p>
              </div>
            </div>
          ))}
        </div>
      </section >

      {/* UTXO Section */}
      < section className="bg-white rounded-lg shadow border border-gray-200 p-6" >
        <h2 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
          <span className="text-2xl">₿</span> Unspent Transaction Outputs (UTXOs)
        </h2>
        <p className="text-gray-500 mb-6 text-sm">Individual Bitcoin outputs with labels and descriptions</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {utxos.map((utxo, i) => (
            <div key={i} className="border border-gray-200 rounded-md p-4">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-semibold text-gray-900">{utxo.title}</h3>
                <div className="font-extrabold text-lg">{utxo.btc}</div>
              </div>
              <p className="text-gray-600 mb-4 text-sm">{utxo.description}</p>

              <dl className="text-gray-600 text-xs font-mono space-y-1">
                <div className="flex justify-between">
                  <dt>Transaction ID:</dt>
                  <dd className="truncate max-w-[130px]">{utxo.txId}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Output:</dt>
                  <dd>{utxo.output}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Address:</dt>
                  <dd className="truncate max-w-[130px]">{utxo.address}</dd>
                </div>
                <div className="flex justify-between items-center">
                  <dt>Confirmations:</dt>
                  <dd>
                    <span className="bg-green-100 text-green-800 text-xs font-semibold rounded-full px-2 py-0.5">
                      {utxo.confirmations.toLocaleString()}
                    </span>
                  </dd>
                </div>
              </dl>
              <p className="mt-2 font-semibold text-gray-800">{utxo.eur}</p>
            </div>
          ))}
        </div>
      </section >
    </div >
  );
};

export default Dashboard;
