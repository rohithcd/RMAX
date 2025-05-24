// Importing built-in dependencies
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import path, { join } from 'path';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import fs from 'fs/promises';

// Importing utility functions
//import { isAuthenticated } from '@/utils/backend/auth';


// Prisma client singleton (to prevent multiple instances)
const prisma = new PrismaClient();


// POST /api/services/file
export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const files = formData.getAll('files');

        if (!files || files.length === 0) {
            return NextResponse.json(
                { error: 'No files provided' },
                { status: 400 }
            );
        }

        // Create uploads directory if it doesn't exist
        const uploadDir = join(process.cwd(), 'public', 'uploads');
        if (!existsSync(uploadDir)) {
            await mkdir(uploadDir, { recursive: true });
        }

        const results = [];
        const errors = [];
        const fileRecordsToCreate = [];

        // First, process all files on disk
        for (const fileData of files) {
            try {
                if (!(fileData instanceof File)) {
                    errors.push(`Invalid file data provided`);
                    continue;
                }

                const file = fileData as File;
                const originalName = file.name;
                const fileType = file.type;
                const fileSize = file.size;

                // Generate a unique filename
                const fileName = `${Date.now()}-${originalName.replace(/\s+/g, '-')}`;
                const filePath = join(uploadDir, fileName);

                // Write file to disk
                const buffer = Buffer.from(await file.arrayBuffer());
                await writeFile(filePath, buffer);

                // Prepare data for database insertion
                fileRecordsToCreate.push({
                    fileName,
                    originalName,
                    filePath,
                    size: fileSize,
                    type: fileType,
                    isVisible: true
                });
            } catch (fileError) {
                errors.push(`Failed to process file: ${(fileError as Error).message}`);
            }
        }

        // Use a single transaction to insert all files at once
        if (fileRecordsToCreate.length > 0) {
            const createdFiles = await prisma.$transaction(
                fileRecordsToCreate.map(fileData =>
                    prisma.file.create({ data: fileData })
                )
            );

            // Collect results
            results.push(...createdFiles.map(file => ({
                id: file.id,
                fileName: file.fileName,
                originalName: file.originalName,
                size: file.size,
                type: file.type,
                createdAt: file.createdAt
            })));
        }

        // Return response with results and any errors
        return NextResponse.json({
            success: results.length > 0,
            message: `Successfully uploaded ${results.length} file(s)${errors.length > 0 ? ` with ${errors.length} error(s)` : ''}`,
            files: results,
            errors: errors.length > 0 ? errors : undefined
        }, {
            status: results.length > 0 ? 200 : 500
        });
    } catch (error) {
        console.error('File upload error:', error);
        return NextResponse.json({
            success: false,
            message: 'File upload failed',
            error: (error as Error).message
        }, {
            status: 500
        });
    } finally {
        await prisma.$disconnect();
    }
}

// DELETE /api/services/file
export async function DELETE(req: NextRequest) {
    try {
        const formData = await req.formData();
        const fileIds = formData.getAll('id');

        if (!fileIds || fileIds.length === 0) {
            return NextResponse.json(
                { error: 'No files provided' },
                { status: 400 }
            );
        }

        const fileRecords = await prisma.file.findMany({
            where: { id: { in: fileIds as string[] }}
        });

        console.log('File Records: ', fileRecords);

        for (const file of fileRecords) {
            try {
                const filePath = file.filePath; // adjust if filePath is relative
                await fs.unlink(filePath);
                console.log(`Deleted file from disk: ${filePath}`);
            } catch (err) {
                console.error(`Error deleting file ${file.filePath}:`, err);
            }
        }

        const deletedFiles = await prisma.file.deleteMany({
            where: { id: { in: fileIds as string[] }}
        });


        // Return response with results and any errors
        return NextResponse.json({
            success: true,
            message: `Successfully deleted ${fileIds.length} file(s)`,
            files: deletedFiles,
            //errors: errors.length > 0 ? errors : undefined
        }, {
            status: 200
        });
    } catch (error) {
        console.error('File upload error:', error);
        return NextResponse.json({
            success: false,
            message: 'File upload failed',
            error: (error as Error).message
        }, {
            status: 500
        });
    } finally {
        await prisma.$disconnect();
    }
}