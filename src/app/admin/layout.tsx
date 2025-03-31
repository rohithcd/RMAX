// Importing built-in dependencies
import type { Metadata } from 'next';

// Importing components
import SessionWrapper from '@/components/sessionWrapper/sessionWrapper';
//import ProtectedPage from '@/components/protectedPage/protectedPage';
import UserDropdown from '@/components/ui/userDropdown/userDropdown';
import Sidebar from '@/components/ui/sidebar/sidebar';


//const inter = Inter({ subsets: ['latin'] })
//import { Inter } from 'next/font/google'
//import './globals.css'

// Configuring admin page metadata
export const metadata: Metadata = {
    title: 'RMAX | Admin',
    description: 'RMAX Admin Page',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <SessionWrapper>
            {/* <ProtectedPage> */}
                <main className="flex min-h-screen w-full flex-col bg-muted/40">
                    <Sidebar />
                    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                        <header className="sticky top-0 z-30 flex h-14 items-center justify-end gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                            {/* <MobileNav /> */}
                            <UserDropdown/>
                        </header>
                        <section className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 bg-muted/40">
                            {children}
                        </section>
                    </div>
                </main>
            {/* </ProtectedPage> */}
        </SessionWrapper>
    )
}