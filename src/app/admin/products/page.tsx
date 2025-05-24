// Importing built-in dependencies
import { PrismaClient } from "@prisma/client";

// Impoting custom components
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ProductsLayout from "@/layout/ProductsLayout";

interface Options {
    label: string, 
    value: string
}

export default async function ProductsPage() {
	const prisma = new PrismaClient();

	const [products, categories, subCategories, tags] = await Promise.all([
		prisma.product.findMany({
			include: {
				subCategory: true,
				category: true,
				images: true
			},
		}),

		prisma.category.findMany(),
		prisma.subCategory.findMany({
			include: {
				category: true
			}
		}), // ✅ Fixed incorrect model

		prisma.tag.findMany({})
	]);

	const categoriesObj = categories.map((row) => ({label: row.name, value: row.id }));
	const subCategoriesObj = subCategories.reduce((acc: Record<string, Options[]>, row: Record<string, unknown>) => {
		if(!Object.hasOwn(acc, (row.category as Record<string, string>).id)) {
			return {...acc, [(row.category as Record<string, string>).id]: [{
				label: row.name as string,
				value: row.id as string,
			}]}
		}

		acc[(row.category as Record<string, string>).id].push({ label: row.name as string, value: row.id as string});
		return acc;
	}, {} as Record<string, Options[]>);

	const tagObj = tags.map((row) => ({text: row.name, value: row.id, selected: false }));

	console.log('Products: ', products);
	console.log('Categories: ', categories);
	console.log('Sub Categories: ', subCategoriesObj);
	console.log('Tags: ', tagObj);

	return (
		<>
			<PageBreadcrumb pageTitle="Products" />
			<ProductsLayout products={products} categories={categoriesObj} subCategories={subCategoriesObj} tags={tagObj}/>
		</>
	)
}