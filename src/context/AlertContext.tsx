'use client';
// Importing built-in dependencies
import { createContext, useContext, useState } from 'react';

// Importing custom components
import Alertbox from '@/components/ui/alertbox';

type AlertOptions = {
    title: string;
    message: string;
    type?: 'success' | 'error' | 'warning' | 'info';
    confirmText?: string;
    cancelText?: string;
};

type AlertContextType = {
    showAlert: (options: AlertOptions) => Promise<boolean>;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: React.ReactNode }) {
    const [alertState, setAlertState] = useState<{
        isOpen: boolean;
        options: AlertOptions;
        resolve: ((value: boolean) => void) | null;
    }>({
        isOpen: false,
        options: { title: '', message: '' },
        resolve: null,
    });

    const showAlert = (options: AlertOptions): Promise<boolean> => {
        return new Promise((resolve) => {
            setAlertState({
                isOpen: true,
                options,
                resolve,
            });
        });
    };

    const handleConfirm = () => {
        alertState.resolve?.(true);
        setAlertState({ ...alertState, isOpen: false });
    };

    const handleCancel = () => {
        alertState.resolve?.(false);
        setAlertState({ ...alertState, isOpen: false });
    };

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}
            <Alertbox
                isOpen={alertState.isOpen}
                title={alertState.options.title}
                message={alertState.options.message}
                //type={alertState.options.type}
                confirmText={alertState.options.confirmText}
                cancelText={alertState.options.cancelText}
                onConfirm={handleConfirm}
                onCancel={alertState.options.cancelText ? handleCancel : undefined}
            />
        </AlertContext.Provider>
    );
}

export function useAlert() {
    const context = useContext(AlertContext);
    if (context === undefined) {
        throw new Error('useAlert must be used within an AlertProvider');
    }
    return context;
}