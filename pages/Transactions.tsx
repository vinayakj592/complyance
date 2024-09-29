import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useSession, signOut } from 'next-auth/react';
import { LogOut, Moon, Sun } from 'lucide-react';
import Cookies from 'js-cookie'; // Import js-cookie for clearing cookies
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
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
  columnHelper.accessor('type', { header: 'Type', cell: (info) => info.getValue() }),
  columnHelper.accessor('amount', { header: 'Amount', cell: (info) => `$${info.getValue().toFixed(2)}` }),
  columnHelper.accessor('description', { header: 'Description', cell: (info) => info.getValue() }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold transition-colors ${
        info.getValue() === 'Approved' ? 'bg-green-200 text-green-800' :
        info.getValue() === 'Rejected' ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'}`}>
        {info.getValue()}
      </span>
    ),
  }),
];

export default function Transactions() {
  const router = useRouter();
  const { data: session } = useSession();
  const [darkMode, setDarkMode] = useState(false);
  const [data, setData] = useState<Transaction[]>([]);

  // Fetch transactions from localStorage
  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    setData(storedTransactions);
  }, []);

  // Handle session changes and store user role in local storage
  useEffect(() => {
    if (session?.user) {
      const userRole = session.user.role;
      if (userRole) {
        localStorage.setItem('userRole', userRole);
      } else {
        console.warn('User role is undefined.');
      }
    } else {
      router.push('/');
    }
  }, [session, router]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Handle transaction submission
  const handleSubmitTransaction = () => {
    router.push('/submittransaction');
  };

  // Clear cookies on logout
  const clearAllCookies = () => {
    const allCookies = Cookies.get();
    Object.keys(allCookies).forEach(cookieName => {
      Cookies.remove(cookieName);
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Head>
        <title>Transactions - Complyance</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-white dark:bg-gray-800 shadow">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Complyance
            </div>
            <div className="flex items-center space-x-4">
              {session?.user?.role === 'employee' && (
                <button
                  onClick={handleSubmitTransaction}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Submit Transaction
                </button>
              )}
              <button
                onClick={() => {
                  signOut(); // Call signOut to log the user out
                  clearAllCookies(); // Clear all cookies after signOut
                  router.push('/'); // Redirect to home page
                }}
                className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Transactions</h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="px-4 py-2 text-left text-sm font-medium">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-2 text-sm">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}