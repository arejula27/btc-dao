
// Define the interface for a single item in the table data
export interface TableItem {
  name: string;
  type: 'project' | 'expense'; // Enforce specific values for type
  allocatedBtc: string;
  eurValue: string;
  signatures: string;
  status: 'active' | 'pending'; // Enforce specific values for status
  lastUpdated: string;
  description: string;
}

interface TableRowProps {
  item: TableItem;
}
function TableRow({ item }: TableRowProps): JSX.Element {
  const getStatusClasses = (status: TableItem['status']): string => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-gray-900">{item.name}</p>
          <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold text-gray-700`}>
          {item.type}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.allocatedBtc}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">€{item.eurValue}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <span className="text-gray-900 font-medium">{item.signatures.split('/')[0]}</span>
        <span className="text-gray-500">/{item.signatures.split('/')[1]}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusClasses(item.status)}`}>
          {item.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.lastUpdated}</td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button className="text-gray-400 hover:text-gray-600 transition">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 110-4 2 2 0 010 4zm0 8a2 2 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </td>
    </tr>
  );
}

export default TableRow;

