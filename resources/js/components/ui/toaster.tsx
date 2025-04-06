import { Toaster as HotToaster } from 'react-hot-toast';

export function Toaster() {
    return (
        <HotToaster
            position="top-right"
            toastOptions={{
                duration: 3000,
                style: {
                    background: 'var(--background)',
                    color: 'var(--foreground)',
                    border: '1px solid var(--border)',
                },
                success: {
                    iconTheme: {
                        primary: 'var(--success)',
                        secondary: 'var(--success-foreground)',
                    },
                },
                error: {
                    iconTheme: {
                        primary: 'var(--destructive)',
                        secondary: 'var(--destructive-foreground)',
                    },
                },
            }}
        />
    );
} 