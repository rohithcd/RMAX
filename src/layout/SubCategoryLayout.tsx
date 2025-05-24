"use client";

// Importing built-in dependencies
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

// Impoting custom components
import DataTable from "@/layout/Datatable";
import { Modal } from "@/components/ui/modal";
import Form from "@/components/components/form/Form";
import Input from "@/components/components/form/input/InputField";
import Button from "@/components/ui/adminButton";
import { Label } from "@radix-ui/react-dropdown-menu";
import Select from "@/components/components/form/Select";

// Importing utility functions
import { toUrlSlug } from "@/utils/frontend/formatter";
import { createRecord, updateRecord } from "@/utils/frontend/api";

interface Options {
    label: string, 
    value: string
}

function SubCategoryLayout({ data, categories }: { data: Record<string, unknown>[], categories: Options[] }) {
    // Variables
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<Record<string, unknown> | null>(null);

    // Reset form state when modal closes
    useEffect(() => {
        if (!isModalOpen) {
            setIsEditMode(false);
        }
    }, [isModalOpen]);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault(); // Prevent default form submission

        try {
            const form = event.currentTarget;
            const formData = new FormData(form);
            
            // Extract basic record data
            const recordData = {
                name: formData.get("name") as string,
                slug: toUrlSlug(formData.get("name") as string),
                category: {
                    connect: {id: formData.get("category") as string}
                }
            };

            // Create or update record
            const [responseData, error] = await (isEditMode && currentRecord 
                ? updateRecord({ 
                    record: { ...recordData, id: currentRecord.id }, 
                    object: "subCategory" 
                })

                : createRecord({ record: recordData, object: "subCategory" })
            );
    
            if (error) {
                console.error("API error:", error);
                toast.error(error.message);
                return;
            }
    
            // Success handling
            console.log("Success:", responseData);
            setIsModalOpen(false);
        } catch (error) {
            console.error("Submission error:", error);
            toast.error((error as Error).message);
        }

    }

    function handleEdit(record: Record<string, unknown>) {
        setCurrentRecord(record);
        setIsEditMode(true);
        setIsModalOpen(true);
    }
    
    function handleAddNew() {
        setCurrentRecord({});
        setIsEditMode(false);
        setIsModalOpen(true);
    }

    const modalTitle = isEditMode ? "Edit Sub Category" : "Add Sub Category";
    const submitButtonText = isEditMode ? "Update" : "Create";

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <Button variant="outline" onClick={handleAddNew} className="w-32">Add Sub Category</Button>
            </div>

            <Modal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                className="mx-42 my-4 overflow-y-auto max-h-[90vh] min-h-[500px]"
            >
                <div className="p-4 border-b ">
                    <h2 className="text-xl font-semibold">{modalTitle}</h2>
                </div>
                
                <Form onSubmit={handleSubmit} className="flex flex-col gap-4 p-8 m-8">
                    <span>
                        <Label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400">Name</Label>
                        <Input 
                            type="text" 
                            name="name" 
                            placeholder="Enter name" 
                            defaultValue={currentRecord?.name as string || ''}
                        />
                    </span>

                    <span>
                        <Label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400">Category</Label>
                        <Select 
                            name="category" 
                            placeholder="Select Category" 
                            options={categories}
                            onChange={() => {}}
                            defaultValue={currentRecord?.categoryId as string || ''}
                        />
                        
                    </span>

                    <Button variant="primary" className="w-32">{submitButtonText}</Button>
                </Form>
            </Modal>
            
            <DataTable columns={{'name': 'text', 'isActive': 'boolean'}} data={data} onEdit={handleEdit} object="productModel"/>
            
        </>
    )
}

export default SubCategoryLayout;