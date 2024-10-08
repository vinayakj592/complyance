import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { LogIn, User, UserCog } from 'lucide-react';

export default function RoleSelector({ onLogin }: { onLogin: (role: 'employee' | 'manager') => void }) {
  const [role, setRole] = useState<'employee' | 'manager'>('employee');

  const handleLogin = async (role: 'employee' | 'manager') => {
    // Perform the login using Google provider
    const result = await signIn('google', { redirect: false }); // Set redirect to false to handle redirection manually
    console.log("SignIn Result:", result); // Log the result for debugging

    if (result?.ok) {
      // Store the role in localStorage
      localStorage.setItem('userRole', role);
      console.log("User role stored in localStorage:", role); // Log the stored role
      onLogin(role); // Callback for login
    } else {
      console.error('Login failed', result); // Log any error messages
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-12">
      <h3 className="text-2xl font-normal mb-6">Access Complyance</h3>
      <p className="mb-6 text-gray-600 dark:text-gray-400">
        Select your role and log in with your company Google account to access the Complyance system.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={() => setRole('employee')}
          className={`flex-1 py-2 px-4 rounded-md flex items-center justify-center font-light ${
            role === 'employee'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
          }`}
        >
          <User className="mr-2" />
          Employee
        </button>
        <button
          onClick={() => setRole('manager')}
          className={`flex-1 py-2 px-4 rounded-md flex items-center justify-center font-light ${
            role === 'manager'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
          }`}
        >
          <UserCog className="mr-2" />
          Manager
        </button>
      </div>
      <button
        onClick={() => handleLogin(role)}
        className="w-full py-2 px-4 font-light bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
      >
        <LogIn className="mr-2" />
        Sign in with Google as {role === 'employee' ? 'Employee' : 'Manager'}
      </button>
    </div>
  );
}