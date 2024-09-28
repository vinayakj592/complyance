import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Moon, Sun, FileText } from 'lucide-react';

const SubmitTransaction: React.FC<{ darkMode: boolean; setDarkMode: (mode: boolean) => void }> = ({ darkMode, setDarkMode }) => {
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'employee') {
      router.push('/');
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Transaction submitted successfully!');
    setType('');
    setAmount('');
    setDescription('');
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <Head>
        <title>Submit Transaction - Complyance</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-3xl font-bold text-center mb-8">Submit Transaction</h1>

      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-colors duration-300">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-center">
            <FileText className="h-12 w-12 text-blue-600 dark:text-blue-400" />
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="type" className="block text-sm font-medium mb-1">Transaction Type</label>
              <input
                type="text"
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 transition-colors duration-300"
                required
              />
            </div>
            <div>
              <label htmlFor="amount" className="block text-sm font-medium mb-1">Amount</label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 transition-colors duration-300"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 transition-colors duration-300"
                rows={3}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
              Submit Transaction
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubmitTransaction;
