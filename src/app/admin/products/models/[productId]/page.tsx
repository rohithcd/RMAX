// Importing built-in dependencies
import { PrismaClient } from "@prisma/client";
import { notFound } from 'next/navigation';

// Importing components
import ProductModelLayout from "@/layout/ProductModelLayout";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

interface ParamsProps {
    params: {
        productId: string;
    }
}

export default async function ProductModel({ params }: ParamsProps) {
    const { productId } = params;
    const prisma = new PrismaClient();

    const [models, product] = await Promise.all([
        prisma.productModel.findMany({
            where: { productId },
            include: {
                sheet: true
            }
        }),

        prisma.product.findFirst({ where: { id: productId } })
    ])

    console.log('Product: ', product);
    console.log('Models: ', models);

    if(!product) {
		notFound();
	}

    return (
        <>
            <PageBreadcrumb pageTitle="Models" />
            <ProductModelLayout data={models} productId={productId}/>
        </>
    );
}