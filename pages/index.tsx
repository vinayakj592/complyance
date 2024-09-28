import RoleSelector from '../components/RoleSelector';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Home() {
    const router = useRouter();

    const handleGoogleLogin = async (role: 'employee' | 'manager') => {
        console.log(`Initiating Google Auth login for ${role}`);
        
        // Sign in with Google
        const result = await signIn('google', { redirect: false });

        if (result?.error) {
            console.error('Error signing in:', result.error);
        } else {
            router.push('/transactions');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-medium text-center mb-4">Complyance: Internal Transaction Approval System</h2>
                    <p className="text-xl font-light text-center mb-12">
                        Streamline our company's financial transaction approvals and auditing process.
                    </p>
                    <RoleSelector onLogin={handleGoogleLogin} />
                </div>
            </main>
            <Footer />
        </div>
    );
}