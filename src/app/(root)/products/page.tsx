// Importing built-in dependencies
import React from "react";
//import Image from "next/image";

// Importing components
import TopBanner from "@/components/sections/topBanner/topBanner";


const Products: React.FC = () => {
    return (
        <>
            <TopBanner src="/images/products-overlay.png" title="Products" subtitle="Home / Products"/>

            <section className="section section-margin"> 
                <h3 className="text-4xl font-bold mb-2">World-Class Lighting & Electrical Solutions for Modern Architectural Mastery</h3>
                <p className="text-sm color-grey">Founded in 2009, RMAX group is a global pioneer in the lighting industry, delivering cutting-edge, intelligent, and sustainable solutions under its flagship RMAX brand. With expertise spanning residential, commercial, and industrial sectors, RMAX fuses top-tier craftsmanship with advanced technology to create premium lighting experiences worldwide—where innovation meets reliability.</p>

                <div className="grid grid-cols-4 gap-6 my-8">
                    <ProductsCard name="Outdoor Lighting"/>
                    <ProductsCard name="Indoor Lighting"/>
                    <ProductsCard name="Solar Lighting"/>
                    <ProductsCard name="Switched & Sockets"/>
                    <ProductsCard name="Electrical Appliances"/>
                </div>
                
            </section>
        </>
    );
};

interface ProductsCard {
    name: string;
}

const ProductsCard: React.FC<ProductsCard> = ({ name }) => {
    return (
        <figure className="relative w-[16rem] h-[10rem] bg-[#D9D9D9] rounded-lg overflow-hidden">

            <figcaption className="w-full absolute bottom-0 f-primary bg-color-primary text-center text-sky-50 font-semibold text-sm py-1 align-bottom">{name}</figcaption>
        </figure>
    );
};

export default Products;
