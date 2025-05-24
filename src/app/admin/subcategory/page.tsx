// Importing built-in dependencies
import { PrismaClient } from "@prisma/client";

// Impoting custom components
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import SubCategoryLayout from "@/layout/SubCategoryLayout";


export default async function SubcategoryPage() {
    const prisma = new PrismaClient();
    const subCategories = await prisma.subCategory.findMany({});
    const categories = await prisma.category.findMany({});

    const categoriesOptions = categories.map((row) => ({label: row.name, value: row.id }));

    console.log('Categories:', subCategories);

    return (
        <>
            <PageBreadcrumb pageTitle="Sub Category" />
            <SubCategoryLayout data={subCategories} categories={categoriesOptions}/>
        </>
    )
}