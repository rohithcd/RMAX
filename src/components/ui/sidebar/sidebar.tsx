// Importing built-in dependencies
import Link from 'next/link';
import Image from 'next/image';

// Importing components
import { NavItem } from '@/components/ui/navItem/navItem';
import { HomeIcon, CubeIcon } from '@radix-ui/react-icons';
import logo from '@/../public/images/rmax-logo.png';
//import styles from './sidebar.module.css';

// Constants
const SIDEBAR_HEADER = {
    title: 'RMAX',
    href: '/',
    icon: logo,
}

const SIDEBAR_OPTIONS = [
    {
        title: 'Home',
        icon: HomeIcon,
        href: '/',
    },
    {
        title: 'Products',
        icon: CubeIcon,
        href: '/admin/products',
    }
]

const Sidebar = () => {
    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex border-[var(--border)]">
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">

                <Link
                    href={SIDEBAR_HEADER.href}
                    className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                >
                    <Image src={SIDEBAR_HEADER.icon} alt={SIDEBAR_HEADER.title} width={48} height={48} />
                    <span className="sr-only">{SIDEBAR_HEADER.title}</span>
                </Link>

                {SIDEBAR_OPTIONS.map((option, index) => (
                    <NavItem key={index} href={option.href} label={option.title}>
                        <option.icon className="h-5 w-5" />
                    </NavItem>
                ))}

            </nav>

            <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                {/* <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip> */}
            </nav>
        </aside>
    );
}

export default Sidebar;

