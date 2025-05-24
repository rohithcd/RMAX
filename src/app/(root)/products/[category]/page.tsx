// Importing built-in dependencies
import React from "react";
import Image from "next/image";
import { PrismaClient } from "@prisma/client";

// Importing components
import TopBanner from "@/components/sections/topBanner/topBanner";


export default async function ProductPage() {
    const prisma = new PrismaClient();
    
    const [] = await Promise.all([
        prisma.product.findMany({})
    ]);

    return (
        <>
            <TopBanner src="/images/products-overlay.png" title="Products" subtitle="Home / Products"/>

            <section className="section section-margin flex gap-8">   
                <aside className="w-[20rem]">
                    <h5 className="text-xl font-semibold mb-2">Filter</h5>

                    <span className="relative">
                        <input 
                            className="outline-[#BE1B1B] outline-1 rounded-md py-3 px-4 text-sm text-black w-full" 
                            type="text" 
                            placeholder="Search Product" 
                            name="search" 
                            required
                        ></input>
                        <Image src="/images/search.png" alt="search" width={20} height={20} className="absolute top-0 right-3"/>
                    </span>
                    

                    <h6 className="text-lg font-semibold mt-4 my-1">Categories</h6>

                    <ul>
                        <li className="flex justify-between">Indoor Lighting (00)</li>
                        <li className="flex justify-between">Outdoor Lighting (00)</li>
                        <li className="flex justify-between">IoT Solutions (00)</li>
                        <li className="flex justify-between">Wiring Devices (00)</li>
                    </ul>

                    <h6 className="text-lg font-semibold mt-4 mb-1">Sub Categories</h6>

                    <div className="flex flex-wrap gap-2">
                        <Tag content="Outdoor lighting"/>
                        <Tag content="Home lighting"/>
                        <Tag content="Exhibition"/>
                        <Tag content="Home lighting"/>
                        <Tag content="Exhibition"/>
                        <Tag content="Outdoor lighting"/>
                        <Tag content="Home lighting"/>
                        <Tag content="Exhibition"/>
                        <Tag content="Home lighting"/>
                        <Tag content="Exhibition"/>
                    </div>
                </aside> 

                <div className="grid grid-cols-3 gap-8">
                    <Product/>
                    <Product/>
                    <Product/>
                    <Product/>
                    <Product/>
                    <Product/>
                    <Product/>
                    <Product/>
                    <Product/>
                    <Product/>
                    <Product/>
                </div>
            </section>
        </>
    );
};

const Product = () => {
    return (
        <div className="relative flex flex-col items-center h-[18rem] w-[16rem]">
            <figure className="z-2 relative bg-[#d9d9d9] overflow-hidden rounded-4xl h-[15rem] w-[14rem]">
                <Image src="/images/demo/product1.png" alt="Product Image" fill={true} />
            </figure>
            <div className="flex items-end justify-between px-5 py-3 absolute top-48 bg-color-primary rounded-2xl h-[6rem] w-[16rem]">
                <p className="text-sm text-stone-50">Sky eye</p>
                <p className="text-sm text-stone-50">10</p>
            </div>
        </div>
    )
}

const Tag = ({ content }: {content: string}) => {
    return (
        <>
            <span
                className="border-1 border-c-primary rounded-md px-2 py-1"
            >
                {content}
            </span>
        </>
    );
}
