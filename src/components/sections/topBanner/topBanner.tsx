// Importing built-in dependencies
import React from "react";
import Image from "next/image";

interface TopBannerProps {
    title: string;
    subtitle: string;
}

export function TopBanner({ title, subtitle}: TopBannerProps) {

    return (
        <>
            <section className="relative h-100 bg-stone-500 w-full flex flex-col gap-4 justify-center items-center">
                <Image src="/images/aboutus-overlay.png" alt="About Us" fill={true} className="object-cover" />
                <h2 className="text-stone-50 text-5xl font-bold z-1">{title}</h2>
                <p className="text-stone-50 text-xs z-1">{subtitle}</p>
            </section>
        </>
    );
}

export default TopBanner;
