"use client"

// Importing built-in dependencies
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { RMAX_LOGO } from '@/config/constants';
import Link from 'next/link';

// Importing components
import Button from '@/components/ui/button/button';

// Importing styles
import styles from './navbar.module.css';

// Importing custo hooks
import { useWindowResize } from '@/hooks/useWindowResize';


const options = [
    {name: 'Home', link: '/'},
    {name: 'About Us', link: '/about-us'},
    {name: 'Solution', link: '/solution'},
    {name: 'Projects', link: '/projects'},
    {name: 'News', link: '/news'},
    {name: 'Products', link: '/products'},
    {name: 'Why RMAX?', link: '/why-rmax'},
    {name: 'Contact Us', link: '/contact-us'}
];

const Navbar = () => {
    const isLargeScreen = useWindowResize(990, (typeof window !== 'undefined') ? window.innerWidth > 990 : true);
    const [sideMenuActive, setSideMenuActive] = useState<boolean>(false);

    // When user resize the window by dragging the screen, it deactivates sidebar
    if(isLargeScreen && sideMenuActive) {
        setSideMenuActive(false);
    }

    function handleClick() {
        setSideMenuActive((prevState) => !prevState);
    }

    useEffect(() => {
        document.body.style.overflow = (sideMenuActive) ? 'hidden' : 'auto';
    }, [sideMenuActive]);

    return (isLargeScreen) ? <MainNavbar/> : <Sidebar onClick={handleClick} isActive={sideMenuActive}/>
}

const MainNavbar = () => {
    return (
        <nav className={`${styles['navbar-div']} section flex justify-between items-center py-4`}>
            <Image src={RMAX_LOGO} alt="RMAX Logo" width={80} height={42} />

            <ul className="flex gap-4">
                {options.map((option) => (
                    <li key={option.name}>
                        <Link href={option.link} className="text-accent-500 hover:text-blue-500">{option.name}</Link>
                    </li>
                ))}
            </ul>

            <Button name="Call us"></Button>
        </nav>
    )
}

const Sidebar = ({ onClick, isActive }: { onClick: () => void, isActive: boolean}) => {
    return (
        <nav className={`absolute z-2 w-full flex justify-between items-center py-4 px-4`}>
            <Image src={RMAX_LOGO} alt="RMAX Logo" width={80} height={42} />
            <Image src='/icons/hamburger.svg' alt="RMAX Logo" width={32} height={32} onClick={onClick}/>

            {isActive && (
                <aside className={`fixed top-0 right-0 w-[20rem] h-full bg-white flex flex-col items-center justify-center gap-4`}>
                    <Image src='/icons/hamburger.svg' alt="RMAX Logo" width={32} height={32} onClick={onClick}/>

                    {options.map((option) => (
                        <li key={option.name}>
                            <Link href={option.link} className="text-accent-500 hover:text-blue-500" onClick={onClick}>{option.name}</Link>
                        </li>
                    ))}
                    <Button name="Call us"></Button>
                </aside>
            )}
        </nav>
    );
}

export default Navbar;