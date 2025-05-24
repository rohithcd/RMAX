"use client";

// Importing built-in dependencies
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

// Impoting custom components
import ProductsTable from "@/layout/ProductsTable";
import { Modal } from "@/components/ui/modal";
import { Label } from "@radix-ui/react-dropdown-menu";
import Form from "@/components/components/form/Form";
import Input from "@/components/components/form/input/InputField";
import TextArea from "@/components/components/form/input/TextArea";
import Button from "@/components/ui/adminButton";
import MultiSelect from "@/components/components/form/MultiSelect";
import FileInput from "@/components/components/form/input/FileInput";
import Select from "@/components/components/form/Select";

// Importing utility functions
import { createRecord, updateRecord, uploadFiles } from "@/utils/frontend/api";


//import { useRouter } from "next/navigation";

interface ProductProps {
    id: string;
    name: string;
    subtitle: string;
    description: string;

    category: Record<string, unknown>;
    categoryId: string;

    subCategory: Record<string, unknown>;
    subCategoryId: string;

    tags?: Record<string, unknown>[];
    isActive: boolean;
}

interface Options {
    label: string, 
    value: string
}

export function ProductsPage({ products, categories, subCategories, tags }: { products: ProductProps[], categories: Options[], subCategories: Record<string, Options[]>, tags: {text: string, value: string, selected: boolean}[] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<ProductProps | null>(null);
    const [subCategoryOptions, setSubCategoryOptions] = useState<Options[]>([]);
    const [tagIds, setTagIds] = useState<string[]>([]);

    // Reset form state when modal closes
    useEffect(() => {
        if (!isModalOpen) {
            setIsEditMode(false);
            setCurrentProduct(null);
        }
    }, [isModalOpen]);

    function handleMultiSelectChange(value: Array<string>) {
        console.log('Value: ', value);
        //setSubCategoryIds(e);
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault(); // Prevent default form submission

        try {
            const form = event.currentTarget;
            const formData = new FormData(form);
            
            // Extract basic record data
            const recordData = {
                name: formData.get("name") as string,
                subtitle: formData.get("subtitle") as string,
                description: formData.get("description") as string
                // Other fields as needed
            };
    
            // Handle file uploads more effectively
            const files: File[] = [];
            
            // Add sheet file if it exists and is valid
            const sheetFile = formData.get("sheet") as File;
            if (sheetFile && sheetFile.size > 0 && sheetFile.name) {
                files.push(sheetFile);
            }
            
            // Add image files using spread operator for better array handling
            const imageFiles = formData.getAll("images") as File[];
            if (imageFiles && imageFiles.length > 0) {
                files.push(...imageFiles.filter(file => file.size > 0 && file.name));
            }
    
            // Process file uploads first if there are files
            let fileIds: string[] = [];
            
            if (files.length > 0) {
                const [uploadResponse, uploadError] = await uploadFiles({ files });
    
                if (uploadError) {
                    console.error("File upload error:", uploadError);
                    toast.error(uploadError.message);
                    return;
                }
    
                // Extract file IDs from the response
                if (uploadResponse?.files && Array.isArray(uploadResponse.files)) {
                    console.log('File upload response');
                    fileIds = uploadResponse.files.map(file => file.id);
                }
                
                console.log("Uploaded files:", uploadResponse);
            }
    
            // Get category ID with fallback
            const categoryId = formData.get("category") as string;
            const subCategoryId = formData.get("subCategory") as string;
            const productSheet = (sheetFile) ? fileIds[0] : null;
            
            // Prepare the record data for creation/update
            const recordPayload = {
                ...recordData,
                category: {
                    connect: { id: categoryId }
                },
                subCategory: {
                    connect: { id: subCategoryId }
                },
                ...(productSheet ? {
                    dataSheet: {
                        connect: { id: productSheet }
                    },
                }: {}),

                ...(tagIds.length > 0 ? {
                    tags: {
                        [isEditMode ? 'set' : 'connect']: tagIds.map((id: string) => ({ id }))
                    }
                } : {}),

                ...(fileIds.length > 0 ? {
                    images: {
                        connect: fileIds.map(id => ({ id }))
                    }
                } : {})
            };
    
            // Create or update record
            const [responseData, error] = await (isEditMode && currentProduct 
                ? updateRecord({ 
                    record: { ...recordPayload, id: currentProduct.id }, 
                    object: "product" 
                  })
                : createRecord({ 
                    record: recordPayload, 
                    object: "product" 
                  })
            );
    
            if (error) {
                console.error("API error:", error);
                toast.error(error.message);
                return;
            }
    
            // Success handling
            console.log("Success:", responseData);
            setIsModalOpen(false);
            setTagIds([]);
            
            // Use shallow routing to refresh data without full page reload
            //router.replace(router.asPath, undefined, { shallow: true });
        } catch (error) {
            toast.error((error as Error).message);
            console.log('Error: ', error);
        }
    }

    function handleEdit(product: ProductProps) {
        setCurrentProduct(product);
        setIsEditMode(true);
        setIsModalOpen(true);
        setSubCategoryOptions(subCategories[product.categoryId])
    }
    
    function handleAddNew() {
        setIsEditMode(false);
        setCurrentProduct(null);
        setTagIds([]);
        setIsModalOpen(true);
    }

    function handleCategoryChange(selectedValue: string) {
        setSubCategoryOptions(subCategories[selectedValue]);
    }

    const modalTitle = isEditMode ? "Edit Product" : "Add Product";
    const submitButtonText = isEditMode ? "Update" : "Create";

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <Button variant="outline" onClick={handleAddNew} className="w-32">Add Product</Button>
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
                        <Label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400">Product Name</Label>
                        <Input 
                            type="text" 
                            name="name" 
                            placeholder="Enter product name" 
                            defaultValue={currentProduct?.name || ''}
                        />
                    </span>

                    <span>
                        <Label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400">Product Subtitle</Label>
                        <Input 
                            type="text" 
                            name="subtitle" 
                            placeholder="Enter product subtitle" 
                            defaultValue={currentProduct?.subtitle || ''}
                        />
                    </span>

                    <span>
                        <Label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400">Product Description</Label>
                        <TextArea 
                            name="description" 
                            placeholder="Enter product description" 
                            rows={4}
                            defaultValue={currentProduct?.description || ''}
                        />
                    </span>

                    <span>
                        <Label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400">Product Category</Label>
                        <Select 
                            name="category" 
                            options={categories} 
                            onChange={handleCategoryChange}
                            defaultValue={currentProduct?.categoryId || ''}
                        />
                    </span>

                    <span>
                        <Label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400">Product Sub Category</Label>
                        <Select 
                            name="subCategory" 
                            options={subCategoryOptions} 
                            onChange={() => {}}
                            defaultValue={currentProduct?.subCategoryId || ''}
                        />
                    </span>

                    <MultiSelect 
                        name="tags" 
                        label="Select Tags" 
                        onChange={handleMultiSelectChange} 
                        options={[{text: "Select Tags", value: "", selected: true}, ...tags]}
                        defaultSelected={tagIds}
                    />

                    <span>
                        <Label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400">Product Sheet</Label>
                        <FileInput name="sheet"/>
                    </span>

                    <span>
                        <Label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400">Product Image</Label>
                        <FileInput name="images"/>
                    </span>

                    <Button variant="primary" className="w-32">{submitButtonText}</Button>
                </Form>
            </Modal>
            
            <ProductsTable data={products} onEdit={handleEdit}/>
        </>
    )
}

export default ProductsPage;