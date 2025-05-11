// Importing built-in dependencies
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs';

// Importing utility functions
import { isAuthenticated } from '@/utils/backend/auth';

// Prisma client singleton (to prevent multiple instances)
const prisma = new PrismaClient();

// GET /api/services/file/[fileName] or /api/services/file/[fileName]?action=download
export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const fileName = path.basename(url.pathname);
    const action = url.searchParams.get('action');

    const file = await prisma.file.findUnique({ where: { fileName }});

    if(!file) {
        return NextResponse.json({ message: 'File not found on the server' }, { status: 404 });
    }

    if(!file.isVisible && !(await isAuthenticated(req))) {
        return NextResponse.json({ message: 'File is not available or currently archived by the admin' }, { status: 404 });
    }

    const absoluteFilePath = path.join(process.cwd(), 'public', file.filePath);

    if(!fs.existsSync(absoluteFilePath)) {
        return NextResponse.json({ message: 'File not found on the server' }, { status: 404 });
    }

    // Stream the file
    const fileStream = fs.createReadStream(absoluteFilePath);

    // Return a streamable response
    const readableStream = new ReadableStream({
        start(controller) {
            fileStream.on('data', (chunk) => controller.enqueue(chunk));
            fileStream.on('end', () => controller.close());
            fileStream.on('error', (err) => controller.error(err));
        },
    });

    const headers = new Headers({
        'Content-Type': file.type,
        ...(action === 'download' && { 'Content-Disposition': `attachment; filename="${file.fileName}"` }),
    });

    return new NextResponse(readableStream, { headers }); /// Return the file stream as a response
}