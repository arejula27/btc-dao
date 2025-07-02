// src/components/BitcoinSummaryCard.tsx
import React from 'react';

interface BitcoinSummaryCardProps {
  title: string;
  btc: string;
  eur: string;
  status?: string; // Optional prop
  percentage?: string; // Optional prop
  total?: string; // Optional prop
  btcRate?: string; // Optional prop
  icon?: string; // Optional SVG path for an icon
}

function BitcoinSummaryCard({ title, btc, eur, status, percentage, total, btcRate, icon }: BitcoinSummaryCardProps): JSX.Element {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-gray-400 text-sm font-semibold">{title}</h3>
        {icon && (
          <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 512 512">
            <path d={icon} />
          </svg>
        )}
      </div>
      <div className="text-white">
        <p className="text-2xl font-bold mb-1">₿{btc}</p>
        <p className="text-gray-400 text-sm mb-3">€{eur}</p>
        {status && <p className="text-green-500 text-xs font-semibold">{status}</p>}
        {percentage && <p className="text-blue-400 text-xs font-semibold">{percentage} of {total}</p>}
        {btcRate && <p className="text-gray-400 text-xs">@ €{btcRate}/BTC</p>}
      </div>
    </div>
  );
}

export default BitcoinSummaryCard;
