// Importing built-in dependencies
import { PrismaClient } from "@prisma/client";
import { notFound } from 'next/navigation';

// Importing components
import ProductModelLayout from "@/layout/ProductModelLayout";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ProductCardLayout from "@/layout/ProductCardLayout";

interface ParamsProps {
    params: {
        productId: string;
    }
}

export default async function ProductCard({ params }: ParamsProps) {
    const { productId } = params;
    const prisma = new PrismaClient();

    const [cards, product] = await Promise.all([
        prisma.productCard.findMany({
            where: { productId },
            include: {
                image: true
            }
        }),

        prisma.product.findFirst({ where: { id: productId } })
    ])

    console.log('Product: ', product);
    console.log('Models: ', cards);

    if(!product) {
		notFound();
	}

    return (
        <>
            <PageBreadcrumb pageTitle="Cards" />
            <ProductCardLayout data={cards} productId={productId}/>
        </>
    );
}