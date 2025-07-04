import { Link } from 'react-router';
import BitcoinSummaryCard from '../components/BitcoinSummaryCard';

const summaryCards = [
  {
    title: 'Available Bitcoin',
    btc: '12.5847',
    eur: '532.962,05',
    status: 'Ready for allocation',
    navigateTo: '/holdings',
    icon: "M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-224c0-35.3-28.7-64-64-64L80 128c-8.8 0-16-7.2-16-16s7.2-16 16-16l368 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L64 32zM416 272a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
  },
  {
    title: 'Allocated Bitcoin',
    btc: '8.2156',
    eur: '347.930,66',
    percentage: '39.5%',
    total: 'total',
    icon: "M304 240l0-223.4c0-9 7-16.6 16-16.6C443.7 0 544 100.3 544 224c0 9-7.6 16-16.6 16L304 240zM32 272C32 150.7 122.1 50.3 239 34.3c9.2-1.3 17 6.1 17 15.4L256 288 412.5 444.5c6.7 6.7 6.2 17.7-1.5 23.1C371.8 495.6 323.8 512 272 512C139.5 512 32 404.6 32 272zm526.4 16c9.3 0 16.6 7.8 15.4 17c-7.7 55.9-34.6 105.6-73.9 142.3c-6 5.6-15.4 5.2-21.2-.7L320 288l238.4 0z"
  },
  {
    title: 'Total Bitcoin',
    btc: '20.8003',
    eur: '880.892,71',
    btcRate: '42.350,00',
    icon: "M504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-141.7-35.3c4.9-33-20.2-50.7-54.6-62.6l11.1-44.7-27.2-6.8-10.9 43.5c-7.2-1.8-14.5-3.5-21.8-5.1l10.9-43.8-27.2-6.8-11.2 44.7c-5.9-1.3-11.7-2.7-17.4-4.1l0-.1-37.5-9.4-7.2 29.1s20.2 4.6 19.8 4.9c11 2.8 13 10 12.7 15.8l-12.7 50.9c.8 .2 1.7 .5 2.8 .9-.9-.2-1.9-.5-2.9-.7l-17.8 71.3c-1.3 3.3-4.8 8.4-12.5 6.5 .3 .4-19.8-4.9-19.8-4.9l-13.5 31.1 35.4 8.8c6.6 1.7 13 3.4 19.4 5l-11.3 45.2 27.2 6.8 11.2-44.7a1038.2 1038.2 0 0 0 21.7 5.6l-11.1 44.5 27.2 6.8 11.3-45.1c46.4 8.8 81.3 5.2 96-36.7 11.8-33.8-.6-53.3-25-66 17.8-4.1 31.2-15.8 34.7-39.9zm-62.2 87.2c-8.4 33.8-65.3 15.5-83.8 10.9l14.9-59.9c18.4 4.6 77.6 13.7 68.8 49zm8.4-87.7c-7.7 30.7-55 15.1-70.4 11.3l13.5-54.3c15.4 3.8 64.8 11 56.8 43z"
  }
];

const allocations = [
  {
    name: 'Product Development Q1',
    description: 'Frontend and backend development for new features',
    type: 'project',
    btc: '₿2.5000',
    eur: '€105.875,00',
    signatures: '3/3',
    status: 'active',
    updated: '15/01/2024',
  },
  {
    name: 'Marketing Campaign',
    description: 'Q1 digital marketing and advertising budget',
    type: 'expense',
    btc: '₿1.2500',
    eur: '€52.937,50',
    signatures: '2/3',
    status: 'pending',
    updated: '14/01/2024',
  },
  {
    name: 'Infrastructure Upgrade',
    description: 'Server infrastructure and security improvements',
    type: 'project',
    btc: '₿3.0000',
    eur: '€127.050,00',
    signatures: '1/3',
    status: 'pending',
    updated: '13/01/2024',
  },
  {
    name: 'Legal & Compliance',
    description: 'Legal consultation and regulatory compliance',
    type: 'expense',
    btc: '₿0.8000',
    eur: '€33.880,00',
    signatures: '3/3',
    status: 'active',
    updated: '12/01/2024',
  },
];

const statusStyles: any = {
  active: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
};

const typeColors: any = {
  project: 'bg-purple-100 text-purple-800',
  expense: 'bg-orange-100 text-orange-800',
};

const AllocationDashboard = () => {
  return (
    <div className="min-h-screen bg-white px-8 py-6 max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-md flex items-center justify-center text-lg font-bold">
            ₿
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Bitcoin Treasury</h1>
            <p className="text-sm text-gray-500">Company Bitcoin Management Dashboard</p>
          </div>
        </div>
        <button className="bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800">
          + New Allocation
        </button>
      </header>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {summaryCards.map((card, idx) => (
          <BitcoinSummaryCard key={idx} {...card} />
        ))}
      </div>

      {/* Projects Table */}
      <section className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Projects & Expenses</h2>
            <p className="text-sm text-gray-500">
              Bitcoin allocations across all projects and operational expenses • Requires 3 of 5 signatures for activation
            </p>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search projects..."
              className="border border-gray-300 rounded-md px-3 py-1.5 text-sm w-48"
            />
            <button className="border border-gray-300 px-3 py-1.5 text-sm rounded-md hover:bg-gray-100">
              Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="text-gray-500 border-b">
              <tr>
                <th className="py-2 px-2">Name</th>
                <th className="py-2 px-2">Type</th>
                <th className="py-2 px-2">Allocated Bitcoin</th>
                <th className="py-2 px-2">EUR Value</th>
                <th className="py-2 px-2">Signatures</th>
                <th className="py-2 px-2">Status</th>
                <th className="py-2 px-2">Last Updated</th>
                <th className="py-2 px-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allocations.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-2">
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-gray-500 text-xs">{item.description}</p>
                  </td>
                  <td className="py-3 px-2">
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${typeColors[item.type]}`}
                    >
                      {item.type}
                    </span>
                  </td>
                  <td className="py-3 px-2">{item.btc}</td>
                  <td className="py-3 px-2">{item.eur}</td>
                  <td className="py-3 px-2 flex items-center gap-1">
                    {item.signatures}
                    <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                  </td>
                  <td className="py-3 px-2">
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusStyles[item.status]}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-2">{item.updated}</td>
                  <td className="py-3 px-2 text-right">
                    <button className="text-gray-500 hover:text-gray-700 text-lg">•••</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AllocationDashboard;
