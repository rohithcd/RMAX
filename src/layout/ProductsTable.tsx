"use client"

// Importing built-in dependencies
import React, { useEffect } from "react";

// Importing components
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import Badge from "@/components/ui/badge/Badge"

interface ProductProps {
	name: string;
	category: string;
	subCategory: string;
	status: "Active" | "Deactive";
}

interface ProductTableProps {
	data: ProductProps[];
}

const productKeys: (keyof ProductProps)[] = ["name", "category", "subCategory", "status"];

export default function ProductsTable({ data }: ProductTableProps) {
	useEffect(() => {

	}, [])
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
							{Array.isArray(data) && data?.length > 0 ?

								data.map((item, index) => (
									<TableRow key={index}>
										{productKeys.map((key) => (
											<TableCell
												key={key}
												className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400"
											>
												{key === "status" ? 
												
													<Badge
													size="sm"
													color="success"
												>
													{item[key]}
												</Badge>

												:
												item[key]
											
												}
												
											</TableCell>
										))}
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

