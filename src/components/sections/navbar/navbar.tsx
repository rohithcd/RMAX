// Importing built-in dependencies
import React from 'react';
import Image from 'next/image';
import { RMAX_LOGO } from '@/config/constants';
import Link from 'next/link';

// Importing components
import Button from '@/components/ui/button/button';

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
    return ( 
        <nav className="section flex justify-between items-center py-4">
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

export default Navbar;