// Importing built-in dependencies
import type { Metadata } from 'next';

// Importing components
import SessionWrapper from '@/layout/SessionWrapper';
//import ProtectedPage from '@/layout/ProtectedPage';
import AdminWrapper from '@/layout/AdminWrapper';

// Importing context providers
import { ThemeProvider } from '@/context/ThemeContext';
import { SidebarProvider } from '@/context/SidebarContext';
import { AlertProvider } from '@/context/AlertContext';

// Configuring admin page metadata
export const metadata: Metadata = {
    title: 'RMAX | Admin',
    description: 'RMAX Admin Page',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <SessionWrapper>
            {/* <ProtectedPage> */}
                <ThemeProvider>
                    <SidebarProvider>
                        <AlertProvider>
                            <AdminWrapper>
                                {children}
                            </AdminWrapper>
                        </AlertProvider>
                    </SidebarProvider>
                </ThemeProvider>
            {/* </ProtectedPage> */}
        </SessionWrapper>
    )
}