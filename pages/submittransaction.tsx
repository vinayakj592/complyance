import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

const SubmitTransaction: React.FC = () => {
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Only run this effect on the client-side
    if (typeof window !== 'undefined') {
      const userRole = localStorage.getItem('userRole');
      console.log("User role from localStorage:", userRole);

      // Check if the user role is 'employee', if not, redirect to the home page
      if (userRole !== 'employee') {
        router.push('/');  // Redirect to home if not employee
      }
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form inputs
    if (!type || !amount || !description) {
      alert("Please fill all the fields");
      return;
    }

    const newTransaction = {
      id: Date.now().toString(),
      type,
      amount: parseFloat(amount), // Convert amount to number
      description,
      status: 'Pending',
    };

    // Store the transaction in localStorage
    const storedTransactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    localStorage.setItem('transactions', JSON.stringify([...storedTransactions, newTransaction]));

    alert('Transaction submitted successfully!');
    setType('');
    setAmount('');
    setDescription('');
    router.push('/transactions');  // Navigate back to transactions page
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <Head>
        <title>Submit Transaction - Complyance</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-3xl font-bold text-center mb-8">Submit Transaction</h1>

      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="type" className="block text-sm font-medium mb-1">Transaction Type</label>
              <input
                type="text"
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={3}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md"
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