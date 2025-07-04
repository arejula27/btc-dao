import { Link } from 'react-router';

interface BitcoinSummaryCardProps {
  title: string;
  btc: string;
  eur: string;
  status?: string; // Optional prop
  percentage?: string; // Optional prop
  total?: string; // Optional prop
  btcRate?: string; // Optional prop
  icon?: string; // Optional SVG path for an icon
  navigateTo?: string; // Optional navigation path
}

function BitcoinSummaryCard({ title, btc, eur, status, percentage, total, btcRate, icon, navigateTo }: BitcoinSummaryCardProps): JSX.Element {

  // Function to determine the status text color
  const getStatusTextColor = (statusText: string): string => {
    switch (statusText) {
      case 'Ready for allocation': // This exact string from your data for 'Available Bitcoin' card
        return 'text-status-info'; // Use the info status color
      // Add other cases if different status strings in summaryData map to different colors
      case 'active': // If you were to use this here, though usually for table items
        return 'text-status-success';
      case 'pending': // If you were to use this here
        return 'text-status-warning';
      default:
        return 'text-text-subtle'; // Fallback for any other status or if status is not defined clearly
    }
  };

  return (
    // Card background should be background-card as defined in your theme

    //If navigation is needed, wrap the card in a Link component

    <Link to={navigateTo || '#'} className="no-underline">
      {/* If card has Link on hover, you can add hover:bg-gray-100 or similar for a hover effect */}
      <div className={`bg-white p-6 rounded-lg shadow-md flex flex-col justify-between ${navigateTo ? "hover:bg-gray-100 transition-colors" : ""}`}>
        <div className="flex justify-between items-start mb-4">
          {/* Title text color - usually subtle in dark themes, but can be default if you prefer */}
          <h3 className="text-gray-500 text-sm font-semibold">{title}</h3>
          {icon && (
            // Icon color - using subtle text color to match the title or default for more prominence
            <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 512 512">
              <path d={icon} />
            </svg>
          )}
        </div>
        {/* Main Bitcoin amount and associated values */}
        <div className="">
          <p className="text-2xl font-bold mb-1">₿{btc}</p>
          {/* EUR value color - subtle to be less prominent than BTC */}
          <p className="text-gray-500 text-sm mb-3">€{eur}</p>

          {status && <p className={`text-xs font-semibold ${getStatusTextColor(status)}`}>{status}</p>}

          {/* Percentage text color - using secondary or info color as a distinct accent, as per the original blue */}
          {/* The 'of total' text should likely be text-text-subtle for less prominence */}
          {percentage && (
            <p className="text-xs font-semibold">
              <span className="text-secondary">{percentage}</span> {/* Using secondary for the percentage number */}
              <span className="text-gray-500"> of {total}</span> {/* Subtler text for 'of total' */}
            </p>
          )}

          {/* BTC Rate color - subtle text */}
          {btcRate && <p className="text-gray-500 text-xs">@ €{btcRate}/BTC</p>}
        </div>
      </div>
    </Link >
  );
}

export default BitcoinSummaryCard;
