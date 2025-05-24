// Importing built-in dependencies
import { PrismaClient } from "@prisma/client";

// Impoting custom components
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BaseLayout from "@/layout/BaseLayout";


export default async function CategoryPage() {
    const prisma = new PrismaClient();
    const categories = await prisma.category.findMany({ include: {
        image: true
    }});

    return (
        <>
            <PageBreadcrumb pageTitle="Category" />
            <BaseLayout name="Category" data={categories}/>
        </>
    )
}