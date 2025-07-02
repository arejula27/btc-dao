
import BitcoinSummaryCard from './components/BitcoinSummaryCard';
import ProjectsExpensesTable from './components/ProjectsExpensesTable';


function App() {
  // Dummy data - in a real app, this would come from an API or state management
  const summaryData = {
    available: {
      btc: '12.5847',
      eur: '532,962.05',
      status: 'Ready for allocation', // Corrected status string
    },
    allocated: {
      btc: '8.2156',
      eur: '347,930.66',
      percentage: '39.5%',
      total: 'total', // 'of total' in the image
    },
    total: {
      btc: '20.8003',
      eur: '880,892.71',
      btcRate: '42,350.00',
    },
  };
  const projectsExpenses = [
    {
      name: 'Product Development Q1',
      type: 'project',
      allocatedBtc: 'B2.5000',
      eurValue: '105,875.00',
      signatures: '3/3',
      status: 'active',
      lastUpdated: '15/01/2024',
      description: 'Frontend and backend development for new features'
    },
    {
      name: 'Marketing Campaign',
      type: 'expense',
      allocatedBtc: 'B1.2500',
      eurValue: '52,937.50',
      signatures: '2/3',
      status: 'pending',
      lastUpdated: '14/01/2024',
      description: 'Q1 digital marketing and advertising budget'
    },
    {
      name: 'Infrastructure Upgrade',
      type: 'project',
      allocatedBtc: 'B3.0000',
      eurValue: '127,050.00',
      signatures: '1/3',
      status: 'pending',
      lastUpdated: '13/01/2024',
      description: 'Server infrastructure and security improvements'
    },
    {
      name: 'Legal & Compliance',
      type: 'expense',
      allocatedBtc: 'B0.8000',
      eurValue: '33,880.00',
      signatures: '3/3',
      status: 'active',
      lastUpdated: '12/01/2024',
      description: 'Legal consultation and regulatory compliance'
    },
  ];

  return (
    // Removed bg-gray-900 and text-gray-100 as they are now on the <body> via index.css
    <div className="min-h-screen p-8 font-sans">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-primary">Bitcoin Treasury</h1> {/* Updated from text-white */}
          <p className="text-sm text-text-muted">Company Bitcoin Management Dashboard</p> {/* Updated from text-gray-400 */}
        </div>
        <button className="bg-primary hover:bg-secondary text-text-heading font-semibold py-2 px-4 rounded-md flex items-center space-x-2"> {/* Updated bg- and text- classes */}
          <span className="text-xl leading-none">+</span>
          <span>New Allocation</span>
        </button>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <BitcoinSummaryCard
          title="Available Bitcoin"
          btc={summaryData.available.btc}
          eur={summaryData.available.eur}
          status={summaryData.available.status}
          icon="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-224c0-35.3-28.7-64-64-64L80 128c-8.8 0-16-7.2-16-16s7.2-16 16-16l368 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L64 32zM416 272a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
        />
        <BitcoinSummaryCard
          title="Allocated Bitcoin"
          btc={summaryData.allocated.btc}
          eur={summaryData.allocated.eur}
          percentage={summaryData.allocated.percentage}
          total={summaryData.allocated.total}
          icon="M304 240l0-223.4c0-9 7-16.6 16-16.6C443.7 0 544 100.3 544 224c0 9-7.6 16-16.6 16L304 240zM32 272C32 150.7 122.1 50.3 239 34.3c9.2-1.3 17 6.1 17 15.4L256 288 412.5 444.5c6.7 6.7 6.2 17.7-1.5 23.1C371.8 495.6 323.8 512 272 512C139.5 512 32 404.6 32 272zm526.4 16c9.3 0 16.6 7.8 15.4 17c-7.7 55.9-34.6 105.6-73.9 142.3c-6 5.6-15.4 5.2-21.2-.7L320 288l238.4 0z"
        />
        <BitcoinSummaryCard
          title="Total Bitcoin"
          btc={summaryData.total.btc}
          eur={summaryData.total.eur}
          btcRate={summaryData.total.btcRate}
          icon="M504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-141.7-35.3c4.9-33-20.2-50.7-54.6-62.6l11.1-44.7-27.2-6.8-10.9 43.5c-7.2-1.8-14.5-3.5-21.8-5.1l10.9-43.8-27.2-6.8-11.2 44.7c-5.9-1.3-11.7-2.7-17.4-4.1l0-.1-37.5-9.4-7.2 29.1s20.2 4.6 19.8 4.9c11 2.8 13 10 12.7 15.8l-12.7 50.9c.8 .2 1.7 .5 2.8 .9-.9-.2-1.9-.5-2.9-.7l-17.8 71.3c-1.3 3.3-4.8 8.4-12.5 6.5 .3 .4-19.8-4.9-19.8-4.9l-13.5 31.1 35.4 8.8c6.6 1.7 13 3.4 19.4 5l-11.3 45.2 27.2 6.8 11.2-44.7a1038.2 1038.2 0 0 0 21.7 5.6l-11.1 44.5 27.2 6.8 11.3-45.1c46.4 8.8 81.3 5.2 96-36.7 11.8-33.8-.6-53.3-25-66 17.8-4.1 31.2-15.8 34.7-39.9zm-62.2 87.2c-8.4 33.8-65.3 15.5-83.8 10.9l14.9-59.9c18.4 4.6 77.6 13.7 68.8 49zm8.4-87.7c-7.7 30.7-55 15.1-70.4 11.3l13.5-54.3c15.4 3.8 64.8 11 56.8 43z"
        />
      </section>
      <section className=" p-6 rounded-lg shadow-md"> {/* Updated from bg-gray-800 */}
        <ProjectsExpensesTable data={projectsExpenses} />
      </section>
    </div>
  )
}

export default App
