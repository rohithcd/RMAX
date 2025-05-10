// Importing built-in dependencies
import { PrismaClient } from "@prisma/client";

// Impoting custom components
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BaseLayout from "@/layout/BaseLayout";


export async function SubcategoryPage() {
    const prisma = new PrismaClient();
    const subCategories = await prisma.tag.findMany({});

    console.log('Categories:', subCategories);

    return (
        <>
            <PageBreadcrumb pageTitle="Sub Category" />
            <BaseLayout name="Sub Category" data={subCategories}/>
        </>
    )
}

export default SubcategoryPage;