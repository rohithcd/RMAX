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

export default async function ProductPage({ params }: ParamProps) {
    const prisma = new PrismaClient();
    const { category } = params;
    
    console.log('Category: ', category);
    
    const getCategory = await prisma.category.findFirst({where: { slug: category }});
    
    if(!getCategory) {
        notFound();
    }

    const [products, subCategories, categories, groupedCategories] = await Promise.all([
        prisma.product.findMany({
            where: {
                AND: [{ categoryId: getCategory.id }, {isActive: true}]
            },
            include: { images: true }
        }),

        prisma.subCategory.findMany({ 
            where: { 
                AND: [{ categoryId: getCategory.id }, {isActive: true}]
            },
        }),

        prisma.category.findMany({ 
            where: {isActive: true}
        }),

        prisma.product.groupBy({
            by: ['categoryId'],
            where: {
                isActive: true,
            },
            _count: {
                id: true
            }
        })
    ]);

    const categoryMap: Record<string, string> = groupedCategories.reduce((acc, row) => {
        return {...acc, [row.categoryId]: row._count.id}
    }, {});

    const categoryList = categories.map((row) => {
        const categoryCount = categoryMap[row.id];

        return {name: categoryCount !== undefined
        ? `${row.name} (${String(categoryCount).padStart(2, '0')})`
        : `${row.name} (00)`, link: row.slug};
    });

    console.log('Products: ', products);
    console.log('SubCategories: ', subCategories);
    console.log('Category List: ', categoryList);

    const filters = {
        categories: categoryList
    }
    return (
        <>
            <TopBanner src="/images/products-overlay.png" title="Products" subtitle="Home / Products"/>
            <ProductFilter products={products} filters={filters}/>
        </>
    );
};
