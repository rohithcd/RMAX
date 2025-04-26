"use client";

// Impoting custom components
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ProductsTable from "@/layout/ProductsTable";

export function ProductsPage() {
	return (
		<>
			<PageBreadcrumb pageTitle="Products" />
			<ProductsTable data={[]} />
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