import React, { useState } from 'react';
import TableRow from './TableRow';
import type { TableItem } from './TableRow';

interface ProjectsExpensesTableProps {
  data: TableItem[];
}

function ProjectsExpensesTable({ data }: ProjectsExpensesTableProps): JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((item: TableItem) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <div>
          {/* Header text color */}
          <h2 className="text-2xl font-semibold text-primary mb-1">
            Projects & Expenses
          </h2>
          {/* Subtitle text color */}
          <p className="text-sm text-text-subtle">
            Bitcoin allocations across all projects and operational expenses - Requires 3 of 5 signatures for activation
          </p>
        </div>
        <div className="flex space-x-3 mt-4 md:mt-0">
          <div className="relative">
            {/* Search input field styling */}
            <input
              type="text"
              placeholder="Search projects..."
              // Background, border, text, and placeholder colors from theme
              className="pl-10 pr-4 py-2 rounded-lg border border-border-subtle bg-background-default text-text-default placeholder-text-subtle focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {/* Search icon color */}
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-subtle"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Table container styling */}
      <div className="overflow-x-auto rounded-lg border border-border-subtle shadow-sm">
        {/* Table itself, with themed dividers */}
        <table className="min-w-full divide-y divide-border-subtle">
          {/* Table header background and text */}
          <thead className="bg-background-default"> {/* Use default background for table head as it's typically slightly darker than the body in dark themes */}
            <tr>
              {[
                'Name', 'Type', 'Allocated Bitcoin', 'EUR Value', 'Signatures', 'Status', 'Last Updated', 'Actions',
              ].map((header) => (
                <th
                  key={header}
                  scope="col"
                  // Header text color
                  className="px-6 py-3 text-left text-xs font-semibold text-text-subtle uppercase tracking-wide"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          {/* Table body background and dividers */}
          <tbody className="bg-background-card divide-y divide-border-subtle"> {/* Use card background for table body */}
            {filteredData.map((item: TableItem, index: number) => (
              <TableRow key={index} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProjectsExpensesTable;
