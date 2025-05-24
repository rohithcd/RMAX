"use client";

// Importing built-in dependencies
import React, { useEffect, useState } from "react";

// Impoting custom components
import DataTable from "@/layout/Datatable";
import { Modal } from "@/components/ui/modal";
import Form from "@/components/components/form/Form";
import Input from "@/components/components/form/input/InputField";
import TextArea from "@/components/components/form/input/TextArea";
import Button from "@/components/ui/adminButton";
import FileInput from "@/components/components/form/input/FileInput";
import { Label } from "@radix-ui/react-dropdown-menu";
import { createRecord, deleteFiles, updateRecord, uploadFiles } from "@/utils/frontend/api";
import toast from "react-hot-toast";
//import { createRecord, updateRecord, uploadFiles } from "@/utils/frontend/api";

//import { useRouter } from "next/navigation";

// interface ProductModelProps {
//     id: string;
//     name: string;
//     description: string;
//     sheetId: string;
//     sheet: Record<string, unknown>;
//     productId: string;
// }

function ProductModel({ data, productId }: { data: Record<string, unknown>[], productId: string }) {
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
                description: formData.get("description") as string,
            };

            const image = formData.get("image") as File;
            let fileId = null;

            console.log('Image: ', image);

            if(image && image.size > 0 && image.name) {
                const [uploadResponse, uploadError] = await uploadFiles({ files: [image] });
                
                console.log('Upload Response: ', uploadResponse);

                if (uploadError) {
                    console.error("File upload error:", uploadError);
                    toast.error(uploadError.message);
                    return;
                }
    
                // Extract file IDs from the response
                if (uploadResponse?.files && Array.isArray(uploadResponse.files)) {
                    console.log('File upload response');
                    fileId = uploadResponse.files[0].id;
                }
            }

            console.log('RecordData: ', recordData);
            console.log('Is Edit Mode: ', isEditMode);
            console.log('File Id: ', fileId);

            // Create or update record
            const [responseData, error] = await (isEditMode && currentRecord 
                ? updateRecord({ 
                    record: { ...recordData, 
                        
                    ...(fileId ? {
                        sheet: {
                        connect: { id: fileId }
                    }} : {}), 

                    product: {
                        connect: {id: productId}
                    },
                    
                    id: currentRecord.id 
                }, 
                    object: "productModel" 
                  })
                : createRecord({ 
                    record: {...recordData, 
                        
                    ...(fileId ? {
                        sheet: {
                        connect: { id: fileId }
                    }} : {}), 
                    
                    product: {
                        connect: {id: productId}
                    },
                }, 
                    object: "productModel" 
                  })
            );
    
            if (error) {
                console.error("API error:", error);
                toast.error(error.message);
                return;
            }

            if(isEditMode && fileId) {
                const [, error] = await deleteFiles({ fileIds: [fileId] });

                if(error) {
                    console.error('Error: ', error);
                    toast.error(error.message);
                }
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

    const modalTitle = isEditMode ? "Edit Product Model" : "Add Product Model";
    const submitButtonText = isEditMode ? "Update" : "Create";

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <Button variant="outline" onClick={handleAddNew} className="w-32">Add Model</Button>
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
                            placeholder="Enter model title" 
                            defaultValue={currentRecord?.name as string || ''}
                        />
                    </span>

                    <span>
                        <Label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400">Description</Label>
                        <TextArea 
                            name="description" 
                            placeholder="Enter model description" 
                            rows={4}
                            defaultValue={currentRecord?.description as string || ''}
                        />
                    </span>

                    <span>
                        <Label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400">Overlay image</Label>
                        <FileInput name="image"/>
                    </span>

                    <Button variant="primary" className="w-32">{submitButtonText}</Button>
                </Form>
            </Modal>
            
            <DataTable columns={{'name': 'text', 'description': 'text', 'isActive': 'boolean', 'sheet': 'file'}} data={data} onEdit={handleEdit} object="productModel"/>
            
        </>
    )
}

export default ProductModel;