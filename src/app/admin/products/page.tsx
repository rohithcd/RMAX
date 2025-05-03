// Importing built-in dependencies
import { PrismaClient } from "@prisma/client";

// Impoting custom components
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ProductsTable from "@/layout/ProductsTable";
import Alert from "@/components/components/ui/alert/Alert";
import AlertBox from "@/components/ui/alertbox";

interface ProductProps {
	name: string;
	category: string;
	subCategory: string;
	status: "Active" | "Deactive";
}

export async function ProductsPage() {
	const prisma = new PrismaClient();

	const products = await prisma.product.findMany({
		include: {
			subCategory: true,
			category: true,
		}
	});

	console.log('Products:', products);

	return (
		<>
			<PageBreadcrumb pageTitle="Products" />
			<ProductsTable data={products} />
		</>
	)
}

export default ProductsPage;


/*<DropdownMenu>
	<DropdownMenuTrigger asChild>
		<Button aria-haspopup="true" size="icon" variant="ghost">
			<DotsVerticalIcon  className="h-5 w-5 scale-115" />
			<span className="sr-only">Toggle menu</span>
		</Button>
	</DropdownMenuTrigger>

	<DropdownMenuContent align="end" className="bg-stone-50">
		<DropdownMenuLabel>Actions</DropdownMenuLabel>
		<DropdownMenuItem>Edit</DropdownMenuItem>
		<DropdownMenuItem>Deactivate</DropdownMenuItem>
		<DropdownMenuItem>Delete</DropdownMenuItem>
	</DropdownMenuContent>

	</DropdownMenu> */