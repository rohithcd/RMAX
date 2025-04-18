// Importing built-in dependencies
import React from "react";

interface TopBannerProps {
    title: string;
    subtitle: string;
}

export function TopBanner({ title, subtitle}: TopBannerProps) {

    return (
        <>
            <section className="h-100 bg-stone-500 w-full flex flex-col gap-4 justify-center items-center">
                <h2 className="text-stone-50 text-5xl font-bold">{title}</h2>
                <p className="text-stone-50 text-xs">{subtitle}</p>
            </section>
        </>
    );
}

export default TopBanner;
