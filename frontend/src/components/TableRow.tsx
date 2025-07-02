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
        // Use bg-status-success for background and text-text-default for text on the badge
        return 'bg-status-success text-text-default';
      case 'pending':
        // Use bg-status-warning for background and text-text-default for text on the badge
        return 'bg-status-warning text-text-default';
      default:
        // Fallback for any unexpected status, using subtle background and default text
        return 'bg-background-subtle text-text-default';
    }
  };

  return (
    // Updated hover background to be subtle on a dark theme
    <tr className="hover:bg-background-subtle transition">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex flex-col">
          {/* Main text color for name */}
          <p className="text-sm font-semibold text-text-default">{item.name}</p>
          {/* Subtle text color for description */}
          <p className="text-xs text-text-subtle mt-0.5">{item.description}</p>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {/* Type badge - using subtle background and text */}
        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold bg-background-subtle text-text-subtle`}>
          {item.type}
        </span>
      </td>
      {/* Table cell text colors */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-default">{item.allocatedBtc}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-default">€{item.eurValue}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        {/* Signatures: default text for current, subtle for total */}
        <span className="text-text-default font-medium">{item.signatures.split('/')[0]}</span>
        <span className="text-text-subtle">/{item.signatures.split('/')[1]}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {/* Status badge using the getStatusClasses for themed colors */}
        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusClasses(item.status)}`}>
          {item.status}
        </span>
      </td>
      {/* Last updated text color */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-subtle">{item.lastUpdated}</td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        {/* Action button icon color - subtle by default, primary on hover */}
        <button className="text-text-subtle hover:text-primary transition">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            {/* The SVG path you provided originally was incomplete for a standard ellipsis, 
                assuming it should be a vertical ellipsis (dots) icon */}
            <path d="M10 6a2 2 0 100-4 2 2 0 000 4zM10 14a2 2 0 100-4 2 2 0 000 4zM10 22a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
        </button>
      </td>
    </tr>
  );
}

export default TableRow;
