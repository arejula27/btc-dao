
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
  const getTypeClasses = (type: TableItem['type']): string => {
    return type === 'project'
      ? 'bg-purple-600 text-purple-100'
      : 'bg-orange-600 text-orange-100';
  };

  const getStatusClasses = (status: TableItem['status']): string => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-600 text-green-100';
      case 'pending':
        return 'bg-yellow-600 text-yellow-100';
      default:
        return 'bg-gray-500 text-gray-100';
    }
  };

  return (
    <tr className="hover:bg-gray-700">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex flex-col">
          <p className="text-sm font-medium text-white">{item.name}</p>
          <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeClasses(item.type)}`}>
          {item.type}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
        {item.allocatedBtc}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
        €{item.eurValue}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <span className="text-white">{item.signatures.split('/')[0]}</span>
        <span className="text-gray-400">/{item.signatures.split('/')[1]}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(item.status)}`}>
          {item.status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
        {item.lastUpdated}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button className="text-gray-400 hover:text-gray-200">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 110-4 2 2 0 010 4zm0 8a2 2 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </td>
    </tr>
  );
}

export default TableRow;
