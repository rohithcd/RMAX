"use client"

// Importing built-in dependencies
import React from "react";

// Importing components
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import Badge from "@/components/ui/badge/Badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdownMenu/dropdownMenu";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { deleteRecord, updateRecord } from "@/utils/frontend/api";

import { useAlert } from "@/context/AlertContext";

interface ProductProps {
	id: string;
	name: string;
	description: string;
	category: CategoryProps;
	categoryId: string;
	subCategory: CategoryProps[];
	isActive: boolean;
}

interface CategoryProps {
    id: string;
    name: string;
}

interface ProductTableProps {
	data: ProductProps[];
	onEdit: (product: ProductProps) => void;
}

const productKeys: (keyof ProductProps)[] = ["name", "description", "category", "subCategory", "isActive"];

export default function ProductsTable({ data, onEdit }: ProductTableProps) {
	const [products, setProducts] = React.useState<ProductProps[]>(data);
	const { showAlert } = useAlert();

	async function handleStatus(event: React.MouseEvent<HTMLDivElement>) {
		const userConfirmed = await showAlert({
			title: 'Confirm Action',
			message: 'Are you sure you want to perform this action?',
			type: 'warning',
			confirmText: 'Yes, proceed',
			cancelText: 'No, cancel',
		});

		if(!userConfirmed) return;

		const { index } = (event.target as HTMLDivElement).dataset;
		if(!index) return;

		const record = products[Number(index)];
		if(!record) return;

		const recordToUpdate = { isActive: !record.isActive, id: record.id }
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const [_, error] = await updateRecord({ record: recordToUpdate, object: "product" });

		if(error) { console.log('Error:', error)}

		setProducts((prev) => {
			const updatedProducts = [...prev];
			updatedProducts[Number(index)] = { ...updatedProducts[Number(index)], isActive: !record.isActive };
			return updatedProducts;
		});
	}

	async function handleDelete(event: React.MouseEvent<HTMLDivElement>) {
		const userConfirmed = await showAlert({
			title: 'Confirm Action',
			message: 'Are you sure you want to perform this action?',
			type: 'warning',
			confirmText: 'Yes, proceed',
			cancelText: 'No, cancel',
		});

		if(!userConfirmed) return;

		const { index } = (event.target as HTMLDivElement).dataset;
		if(!index) return;

		const record = products[Number(index)];
		if(!record) return;

		const recordToDelete = { id: record.id };

		const [, error] = await deleteRecord({ record: recordToDelete, object: "product" });

		if(error) { console.log('Error:', error)}

		setProducts((prev) => {
			const updatedProducts = [...prev];
			updatedProducts.splice(Number(index), 1);
			return updatedProducts;
		});
	}

	function handleEdit(event: React.MouseEvent<HTMLDivElement>) {
		const { index } = (event.target as HTMLDivElement).dataset;
		if(!index) return;

		const record = products[Number(index)];
		if(!record) return;

		onEdit(record);
	}

	return (
		<div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
			<div className="max-w-full overflow-x-auto">
				<div className="min-w-[1102px]">
					<Table>

						{/* Table Header */}
						<TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
							<TableRow>
								{productKeys.map((item) => (
									<TableCell
										key={item}
										isHeader
										className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
									>
										{item.charAt(0).toUpperCase() + item.slice(1)}
									</TableCell>
								))}
							</TableRow>
						</TableHeader>

						{/* Table Body */}
						<TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
							{Array.isArray(products) && products?.length > 0 ?

								products.map((item, index) => (
									<TableRow key={index}>
										{productKeys.map((key) => (
											<TableCell
												key={key}
												className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400"
											>
												{(key === "category") ?
													(item.category?.name) :
													(key === "subCategory") ?
														(item.subCategory?.map((subCat) => subCat.name).join(", ")) :
													(key === "description") ?
														(item[key] && item[key].length > 50 ? item[key].slice(0, 50) + "..." : item[key]) :
													(key === "isActive") ?
														(item[key] ? 
															<Badge
																size="sm"
																color="success"
															>
																Active
															</Badge> :
															<Badge
																size="sm"
																color="error"
															>
																Deactive
															</Badge>)
														:

														item[key]
												}
												
											</TableCell>
										))}

										<TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 w-2">
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<DotsVerticalIcon  className="h-5 w-5 scale-115" />
												</DropdownMenuTrigger>

												<DropdownMenuContent align="end" className="bg-stone-50 dark:bg-gray-900 dark:border-gray-800">
													<DropdownMenuLabel>Actions</DropdownMenuLabel>
													<DropdownMenuItem onClick={handleEdit} data-id={item.id} data-index={index}>Edit</DropdownMenuItem>
													<DropdownMenuItem onClick={handleStatus} data-id={item.id} data-index={index}>{item.isActive ? "Deactivate" : "Activate"}</DropdownMenuItem>
													<DropdownMenuItem onClick={handleDelete} data-id={item.id} data-index={index}>Delete</DropdownMenuItem>
												</DropdownMenuContent>

											</DropdownMenu> 
										</TableCell>

									</TableRow>
								))

								: 
								
								<TableRow>
									<TableCell className="text-theme-sm dark:text-gray-400 text-center py-4" colSpan={5}>
										No data available
									</TableCell>
								</TableRow>
							}


						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	);
}

