// Importing built-in dependencies
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";

// Importing components
import TopBanner from "@/components/sections/topBanner/topBanner";

// Importing utility functions
import { getFileURL, toUrlSlug } from "@/utils/frontend/formatter";

// const CATEGORY_DATA = [
//     {name: 'Outdoor Lighting'},
//     {name: 'Indoor Lighting'},
//     {name: 'Solar Lighting'},
//     {name: 'Switched & Sockets'},
//     {name: 'Electrical Appliances'},
// ];


export default async function CategoryPage() {
    const prisma = new PrismaClient();
    const categories = await prisma.category.findMany({
        where: { isActive: true },
        include: { image: true }
    });

    return (
        <>
            <TopBanner src="/images/products-overlay.png" title="Products" subtitle="Home / Products"/>

            <section className="section section-margin"> 
                <h3 className="text-4xl font-bold mb-2">World-Class Lighting & Electrical Solutions for Modern Architectural Mastery</h3>
                <p className="text-sm color-grey">Founded in 2009, RMAX group is a global pioneer in the lighting industry, delivering cutting-edge, intelligent, and sustainable solutions under its flagship RMAX brand. With expertise spanning residential, commercial, and industrial sectors, RMAX fuses top-tier craftsmanship with advanced technology to create premium lighting experiences worldwide—where innovation meets reliability.</p>

                <div className="grid grid-cols-3 gap-6 my-8">
                    {categories.map((item) => (
                        <ProductsCard 
                            key={item.name} 
                            name={item.name} 
                            imgSrc={getFileURL(item.image?.fileName)}
                        />
                    ))}
                </div>
                
            </section>
        </>
    );
};

interface ProductsCard {
    name: string;
    imgSrc: string;
}

const ProductsCard: React.FC<ProductsCard> = ({ name, imgSrc }) => {
    return (
        <Link href={`/products/${toUrlSlug(name)}`}>
            <figure className="relative w-[22rem] h-[13rem] bg-[#D9D9D9] rounded-lg overflow-hidden">
                {(imgSrc) && <Image src={imgSrc} alt={name} fill={true}/>}
                <figcaption className="w-full absolute bottom-0 f-primary bg-color-primary text-center text-sky-50 font-semibold text-md py-1 align-bottom">{name}</figcaption>
            </figure>
        </Link>
    );
};
