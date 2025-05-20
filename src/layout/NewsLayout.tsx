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
import MultiSelect from "@/components/components/form/MultiSelect";
import FileInput from "@/components/components/form/input/FileInput";
import { Label } from "@radix-ui/react-dropdown-menu";
import Select from "@/components/components/form/Select";
import { createRecord, updateRecord, uploadFiles } from "@/utils/frontend/api";
//import { createRecord, updateRecord, uploadFiles } from "@/utils/frontend/api";

//import { useRouter } from "next/navigation";

interface NewsProps {
    id: string;
    image: Record<string, string>;
    title: string;
    description: string;
    isActive: boolean;
}

export function NewsPage({ data }: { data: NewsProps }) {
    // Variables
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentNews, setcurrentNews] = useState<NewsProps | null>(null);

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
                title: formData.get("title") as string,
                description: formData.get("description") as string
            };

            const image = formData.get("image") as File;
            let fileId = null;

            if(image && image.size > 0 && image.name) {
                const [uploadResponse, uploadError] = await uploadFiles({ files: [image] });
    
                if (uploadError) {
                    console.error("File upload error:", uploadError);
                    // Show user-friendly error message
                    // setError("Unable to upload files. Please try again.");
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
            const [responseData, error] = await (isEditMode && currentNews 
                ? updateRecord({ 
                    record: { ...recordData, imageId: fileId, id: currentNews.id }, 
                    object: "news" 
                  })
                : createRecord({ 
                    record: {...recordData, imageId: fileId}, 
                    object: "news" 
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
            
            // Use shallow routing to refresh data without full page reload
            //router.replace(router.asPath, undefined, { shallow: true });
        } catch (error) {
            console.error("Submission error:", error);
            // Show user-friendly error message
            // setError("An unexpected error occurred. Please try again.");
        }

    }

    function handleEdit(record: Record<string, unknown>) {
        setcurrentNews(record);
        setIsEditMode(true);
        setIsModalOpen(true);
    }
    
    function handleAddNew() {
        setcurrentNews({});
        setIsEditMode(false);
        setIsModalOpen(true);
    }

    const modalTitle = isEditMode ? "Edit News" : "Add News";
    const submitButtonText = isEditMode ? "Update" : "Create";

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <Button variant="outline" onClick={handleAddNew} className="w-32">Add News</Button>
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
                        <Label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400">Title</Label>
                        <Input 
                            type="text" 
                            name="title" 
                            placeholder="Enter news title" 
                            defaultValue={currentNews?.title || ''}
                        />
                    </span>

                    <span>
                        <Label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400">Description</Label>
                        <TextArea 
                            name="description" 
                            placeholder="Enter news description" 
                            rows={4}
                            defaultValue={currentNews?.description || ''}
                        />
                    </span>

                    <span>
                        <Label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-400">Cover Image</Label>
                        <FileInput name="image"/>
                    </span>

                    <Button variant="primary" className="w-32">{submitButtonText}</Button>
                </Form>
            </Modal>
            
            <DataTable columns={{'title': 'text', 'description': 'text', 'isActive': 'boolean', 'image': 'file'}} data={data} onEdit={handleEdit} object="news"/>
            
        </>
    )
}

export default NewsPage;