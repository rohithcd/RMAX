"use client";

// Importing built-in dependencies
import React, { useEffect, useState } from "react";

// Importing custom components
import { Modal } from "@/components/ui/modal";
import Form from "@/components/components/form/Form";
import Input from "@/components/components/form/input/InputField";
import Button from "@/components/ui/adminButton";
import { Label } from "@radix-ui/react-dropdown-menu";

import { createRecord, deleteRecord, updateRecord } from "@/utils/frontend/api";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdownMenu/dropdownMenu";
import { DotsVerticalIcon } from "@radix-ui/react-icons";

import { useRouter } from "next/navigation";
import { useAlert } from "@/context/AlertContext";


export function BaseLayout({ name, data }: { name: string, data: Record<string, unknown>[] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentItem, setCurrentItem] = useState<Record<string, unknown> | null>(null);
    const [tableData, setTableData] = useState(data);

    const router = useRouter();
    const { showAlert } = useAlert();

    // Reset form state when modal closes
    useEffect(() => {
        if (!isModalOpen) {
            setIsEditMode(false);
            setCurrentItem(null);
        }
    }, [isModalOpen]);

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
    
        const record = data[Number(index)];
        if(!record) return;
    
        const recordToDelete = { id: record.id };
    
        const [, error] = await deleteRecord({ record: recordToDelete, object: "product" });
    
        if(error) { console.log('Error:', error)}
    
        setTableData((prev) => {
            const updatedData = [...prev];
            updatedData.splice(Number(index), 1);
            return updatedData;
        });
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault(); // Prevent default form submission
        const formData = new FormData(event.currentTarget);
        const recordData = {
            name: formData.get("name") as string,
        };

        let objectApiName: string = "";
        let result;

        if(name === "Category") {
            objectApiName = "category";
        } else if(name === "Sub Category") {
            objectApiName = "tag";
        }
        
        if (isEditMode && currentItem) {
            // Update existing product
            result = await updateRecord({ 
                record: { 
                    ...recordData, 
                    id: currentItem.id 
                }, 
                object: objectApiName 
            });
        } else {
            // Create new product
            result = await createRecord({ 
                record: recordData, 
                object: objectApiName 
            });
        }

        const [, error] = result;

        if (error) {
            console.log("Error:", error);
            return;
        }

        setIsModalOpen(false);
        router.replace('/admin/products'); // Refresh the page
    }

    function handleEdit(event: React.MouseEvent<HTMLDivElement>) {
        const { index } = (event.target as HTMLDivElement).dataset;
        if(!index) return;

        const record = data[Number(index)];
        if(!record) return;

        console.log("Editing product:", record);

        setCurrentItem(record);
        setIsEditMode(true);
        setIsModalOpen(true);
    }
    
    function handleAddNew() {
        setIsEditMode(false);
        setCurrentItem(null);
        setIsModalOpen(true);
    }

    const modalTitle = isEditMode ? `Edit ${name}` : `Add ${name}`;
    const submitButtonText = isEditMode ? "Update" : "Create";

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <Button variant="outline" onClick={handleAddNew} className="w-32">{`Add ${name}`}</Button>
            </div>

            <Modal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                className="mx-42 my-4 overflow-y-auto max-h-[90vh] min-h-[500px]"
            >
                <div className="p-4 border-b">
                    <h2 className="text-xl font-semibold">{modalTitle}</h2>
                </div>
                
                <Form onSubmit={handleSubmit} className="flex flex-col gap-4 p-8 m-8">
                    <span>
                        <Label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400">Product Name</Label>
                        <Input 
                            type="text" 
                            name="name" 
                            placeholder="Enter product name" 
                            defaultValue={currentItem?.name as string || ''}
                        />
                    </span>

                    <Button variant="primary" className="w-32">{submitButtonText}</Button>
                </Form>
            </Modal>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
                <div className="min-w-[1102px]">
                    <Table>
    
                        {/* Table Header */}
                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                            <TableRow>
                                <TableCell 
                                    isHeader 
                                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                                >
                                    Name
                                </TableCell>
                            </TableRow>
                        </TableHeader>
    
                        {/* Table Body */}
                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {(Array.isArray(tableData) && tableData?.length > 0) ? 
                                tableData.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                            {item.name as string}
                                        </TableCell>

                                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 w-2">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <DotsVerticalIcon  className="h-5 w-5 scale-115" />
                                                </DropdownMenuTrigger>

                                                <DropdownMenuContent align="end" className="bg-stone-50 dark:bg-gray-900 dark:border-gray-800">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem onClick={handleEdit} data-id={item.id} data-index={index}>Edit</DropdownMenuItem>
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
        </>
    );
}

export default BaseLayout;

