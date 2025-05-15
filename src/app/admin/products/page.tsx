// Importing built-in dependencies
import { PrismaClient } from "@prisma/client";

// Impoting custom components
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ProductsLayout from "@/layout/ProductsLayout";
//import { Modal } from "@/components/ui/modal";

/*interface ProductProps {
	name: string;
	category: string;
	subCategory: string;
	status: "Active" | "Deactive";
}*/

export default async function ProductsPage() {
	const prisma = new PrismaClient();

	const products = await prisma.product.findMany({
		include: {
			subCategory: true,
			category: true,
			images: true
		}
	});

	const categories = await prisma.category.findMany({});
	const subCategories = await prisma.tag.findMany({});

	console.log('Products:', products);
	console.log('Categories:', categories);
	console.log('Subcategories:', subCategories);

	return (
		<>
			<PageBreadcrumb pageTitle="Products" />
			<ProductsLayout products={products} categories={categories} subCategories={subCategories}/>
		</>
	)
}