// Importing built-in dependencies
import React from 'react';
import Image from 'next/image';

// Importing components
import Button from '@/components/ui/button/button';

// Importing styles
import styles from './whyChooseUs.module.css';

interface BoxProps {
    title: string;
    description: string;
}

/* CTA */

/* position: absolute;
width: 685px;
height: 456px;
left: 255px;
top: 1118px;

filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)); */

const WhyChooseUs = () => {
    return ( 
        <section className="max-w-6xl mx-auto py-16 flex justify-between gap-4">
            <figure className="relative h-[300px] w-[460px] rounded-2xl overflow-hidden shadow-lg">
                <Image src="/images/why-choose-us.png" alt="Why Choose Us" fill={true} className="object-cover" />
                <figcaption className="absolute z-2 p-10">
                    <h2 className="f-primary text-5xl font-medium text-stone-50">Brand Profile Cuts Today!</h2>
                    <p className="text-stone-50 text-sm font-thin mt-4">with just few clicks, you&apos;ll unlock a world of illuminetuon and satisfaction delivered straight to your doorstep.</p>
                    <Button className="mt-4" name="Call Us"></Button>
                </figcaption>
            </figure>

            <div className="grid grid-cols-2 gap-4">
                <Box title="Premium Quality" description="Engineered for durability and superior performance." />
                <Box title="Premium Quality" description="Engineered for durability and superior performance." />
                <Box title="Premium Quality" description="Engineered for durability and superior performance." />
                <Box title="Premium Quality" description="Engineered for durability and superior performance." />
            </div>
        </section>
    )
}

const Box = ({ title, description }: BoxProps) => {
    return (
        <div className={`${styles['shadow']} flex flex-col items-start rounded-md p-4 min-h-[100] min-w-[200]`}>
            <h3 className="color-primary f-primary text-base font-semibold">{title}</h3>
            <p className="text-gray-600 text-xs">{description}</p>
        </div>
    );
}

export default WhyChooseUs;