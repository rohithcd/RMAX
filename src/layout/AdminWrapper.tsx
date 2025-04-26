"use client"

// Importing components
import Backdrop from "@/layout/Backdrop";
import AdminSidebar from '@/layout/AdminSidebar';
import AdminHeader from '@/layout/AdminHeader';

// Importing custom hooks
import { useSidebar } from "@/context/SidebarContext";

export default function AdminWrapper({ children }: { children: React.ReactNode }) {
    const { isExpanded, isHovered, isMobileOpen } = useSidebar();

    // Dynamic class for main content margin based on sidebar state
    const mainContentMargin = isMobileOpen ? "ml-0" : isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]";

    return (
        <div className="min-h-screen xl:flex dark:bg-gray-900">
            {/* Sidebar and Backdrop */}
            <AdminSidebar />
            <Backdrop />

            {/* Main Content Area */}
            <div
                className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin} dark:bg-gray-900`}
            >
                {/* Header */}
                <AdminHeader />

                <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">{children}</div>
            </div>
        </div> 
    )
}
