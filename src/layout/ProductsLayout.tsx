"use client";

// Importing built-in dependencies
import React, { useEffect, useState } from "react";

// Impoting custom components
import ProductsTable from "@/layout/ProductsTable";
import { Modal } from "@/components/ui/modal";
import Form from "@/components/components/form/Form";
import Input from "@/components/components/form/input/InputField";
import TextArea from "@/components/components/form/input/TextArea";
import Button from "@/components/ui/adminButton";
import MultiSelect from "@/components/components/form/MultiSelect";
import FileInput from "@/components/components/form/input/FileInput";
import { Label } from "@radix-ui/react-dropdown-menu";
import Select from "@/components/components/form/Select";
import { createRecord, updateRecord, uploadFiles } from "@/utils/frontend/api";

//import { useRouter } from "next/navigation";

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

export function ProductsPage({ products, categories, subCategories }: { products: ProductProps[], categories: CategoryProps[], subCategories: CategoryProps[] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productCategory, setProductCategory] = useState<{label: string, value: string}[]>([]);
    const [productSubCategory, setProductSubCategory] = useState<{text: string, value: string, selected: boolean}[]>([]);
    const [subCategoryIds, setSubCategoryIds] = useState<string[]>([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<ProductProps | null>(null);

    //const router = useRouter();

    useEffect(() => {
        setProductCategory(() => {
            return categories.map((row) => ({
                label: row.name,
                value: row.id
            }));
        });

        setProductSubCategory(() => {
            return subCategories.map((row) => ({
                text: row.name,
                value: row.id,
                selected: false
            }));
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Reset form state when modal closes
    useEffect(() => {
        if (!isModalOpen) {
            setIsEditMode(false);
            setCurrentProduct(null);
            setSubCategoryIds([]);
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
                    // Show user-friendly error message
                    // setError("Unable to upload files. Please try again.");
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
            
            // Prepare the record data for creation/update
            const recordPayload = {
                ...recordData,
                ...(categoryId ? {
                    category: {
                        connect: { id: categoryId }
                    }
                } : {}),
                ...(subCategoryIds.length > 0 ? {
                    subCategory: {
                        [isEditMode ? 'set' : 'connect']: subCategoryIds.map(id => ({ id }))
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
                // Show user-friendly error message
                // setError("Failed to save product. Please try again.");
                return;
            }
    
            // Success handling
            console.log("Success:", responseData);
            setIsModalOpen(false);
            setSubCategoryIds([]);
            
            // Use shallow routing to refresh data without full page reload
            //router.replace(router.asPath, undefined, { shallow: true });
        } catch (error) {
            console.error("Submission error:", error);
            // Show user-friendly error message
            // setError("An unexpected error occurred. Please try again.");
        }
    }

    function handleMultiSelectChange(e: Array<string>) {
        setSubCategoryIds(e);
    }

    function handleEdit(product: ProductProps) {
        console.log("Editing product:", product);

        setCurrentProduct(product);
        setIsEditMode(true);
        setSubCategoryIds(product.subCategory.map((subCat: unknown) => (subCat as Record<string, string>).id)); // Assuming subCategory is an array of objects with an id property
    

        //setSubCategoryIds(); //
        
        // Set form values based on the selected product
        /*if (product.categoryId) {
            // Find and preselect category
            const categoryOption = productCategory.find(cat => cat.value === product.categoryId);
            if (categoryOption) {
                // Note: This depends on how your Select component works
                // You might need to adjust this logic
            }
        }*/
        
        // Get current subcategories for this product
        // This would require additional data fetching in a real implementation
        // For now we're assuming product has a subCategoryIds property (which it doesn't in your interface)
        // You'll need to adjust this based on your actual data structure
        
        // Example placeholder:
        // setSubCategoryIds(product.subCategoryIds || []);
        
        // Open the modal with pre-filled data
        setIsModalOpen(true);
    }
    
    function handleAddNew() {
        setIsEditMode(false);
        setCurrentProduct(null);
        setSubCategoryIds([]);
        setIsModalOpen(true);
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
                            options={productCategory} 
                            onChange={() => {}}
                            defaultValue={currentProduct?.categoryId || ''}
                        />
                    </span>

                    <MultiSelect 
                        name="subCategory" 
                        label="Select Sub Category" 
                        onChange={handleMultiSelectChange} 
                        options={[{text: "Select Sub Category", value: "", selected: true}, ...productSubCategory]}
                        defaultSelected={subCategoryIds} // This is where you set the default selected values

                        // You'll need to adjust this based on how your MultiSelect handles default/selected values
                        //selectedValues={subCategoryIds} 
                    />

                    {/* <span>
                        <Label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400">Product Price</Label>
                        <Input 
                            type="number" 
                            name="price" 
                            placeholder="Enter product price" 
                            min="0" 
                            step={0.10}
                            defaultValue={currentProduct?.price?.toString() || ''}
                        />
                    </span> */}

                    <span>
                        <Label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400">Product Sheet</Label>
                        <FileInput name="sheet"/>
                    </span>

                    <span>
                        <Label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400">Product Sheet</Label>
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