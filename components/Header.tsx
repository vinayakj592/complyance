import { Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Complyance</h1>
        <button
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          <span className="sr-only">Toggle theme</span>
        </button>
      </div>
    </header>
  );
}