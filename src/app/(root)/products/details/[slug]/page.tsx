// Importing built-in dependencies
import React from "react";
import { PrismaClient } from "@prisma/client";

// Importing components
import TopBanner from "@/components/sections/topBanner/topBanner";
import { notFound } from "next/navigation";
import ProductFilter from "@/layout/ProductFilter";

interface ParamProps {
    params: {
        category: string;
    }
}

export default async function ProductDetailPage({ params }: ParamProps) {
    const prisma = new PrismaClient();
    const { slug } = params;
    
    console.log('Product Slug: ', slug);
    
    const product = await prisma.product.findFirst({
        where: { slug },
        include: {
            dataSheet: true,
            images: true,
            models: true,
            cards: true
        }
    });
    
    if(!product) {
        notFound();
    }

    console.log('Product: ', product);

    return (
        <>
            <TopBanner src="/images/products-overlay.png" title="Products" subtitle="Home / Products"/>
            {/* <ProductFilter products={products} filters={filters}/> */}
        </>
    );
};
