import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import { LogOut, Moon, Sun, ArrowUp, ArrowDown } from 'lucide-react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';

type Transaction = {
  id: string;
  type: string;
  amount: number;
  description: string;
  status: 'Pending' | 'Approved' | 'Rejected';
};

const columnHelper = createColumnHelper<Transaction>();

const columns = [
  columnHelper.accessor('type', {
    header: 'Type',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('amount', {
    header: 'Amount',
    cell: (info) => `$${info.getValue().toFixed(2)}`,
  }),
  columnHelper.accessor('description', {
    header: 'Description',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${
          info.getValue() === 'Approved'
            ? 'bg-green-200 text-green-800'
            : info.getValue() === 'Rejected'
            ? 'bg-red-200 text-red-800'
            : 'bg-yellow-200 text-yellow-800'
        }`}
      >
        {info.getValue()}
      </span>
    ),
  }),
];

const mockData: Transaction[] = [
  {
    id: '1',
    type: 'Expense',
    amount: 100.5,
    description: 'Office supplies',
    status: 'Pending',
  },
  {
    id: '2',
    type: 'Income',
    amount: 1000.0,
    description: 'Client payment',
    status: 'Approved',
  },
  {
    id: '3',
    type: 'Expense',
    amount: 50.25,
    description: 'Lunch meeting',
    status: 'Rejected',
  },
  {
    id: '4',
    type: 'Expense',
    amount: 200.0,
    description: 'Software license',
    status: 'Pending',
  },
  {
    id: '5',
    type: 'Income',
    amount: 5000.0,
    description: 'Project completion',
    status: 'Approved',
  },
];

export default function Transactions() {
  const router = useRouter();
  const { data: session } = useSession();
  const [darkMode, setDarkMode] = useState(false);
  const [data] = useState(() => [...mockData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Head>
        <title>Transactions - FinanceFlow</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-white dark:bg-gray-800 shadow">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              FinanceFlow
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  router.push('/');
                }}
                className="flex items-center text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-300"
              >
                {darkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Transactions</h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-colors duration-300">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700 transition-colors duration-300">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            className="flex items-center cursor-pointer"
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: <ArrowUp className="ml-1 h-4 w-4" />,
                              desc: <ArrowDown className="ml-1 h-4 w-4" />,
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 transition-colors duration-300">
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-6 py-4 whitespace-nowrap"
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between px-6 py-3 bg-gray-50 dark:bg-gray-700 transition-colors duration-300">
            <button
              className="px-4 py-2 font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors duration-300"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </button>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Page {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </span>
            <button
              className="px-4 py-2 font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors duration-300"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12 transition-colors duration-300">
        <div className="container mx-auto px-6 py-4 text-center text-gray-600 dark:text-gray-400">
          © 2023 FinanceFlow - Internal Company Tool. All rights reserved.
        </div>
      </footer>
    </div>
  );
}