import RoleSelector from '../components/RoleSelector';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
    const router = useRouter();
    const { data: session } = useSession();

    const handleGoogleLogin = async (role: 'employee' | 'manager') => {
        console.log(`Initiating Google Auth login for ${role}`);
        await signIn('google', { callbackUrl: '/transactions' });
    };

    useEffect(() => {
        if (session) {
            
            // Redirect to transactions page for both roles
            router.push('/transactions');
        }
    }, [session, router]);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-medium text-center mb-4">
                        Complyance: Internal Transaction Approval System
                    </h2>
                    <RoleSelector onLogin={handleGoogleLogin} />
                </div>
            </main>
            <Footer />
        </div>
    );
}
