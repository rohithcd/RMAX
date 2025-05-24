// Importing built-in dependencies
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

// Importing utility functions
//import { isAuthenticated } from '@/utils/backend/auth';


// Prisma client singleton (to prevent multiple instances)
const prisma = new PrismaClient();

// PATCH /api/services/rest/?object=<objectName>
export async function PATCH(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const objectName = url.searchParams.get('object');

        if (!objectName) {
            return NextResponse.json({ message: 'Object must be passed in query params.' }, { status: 400 });
        }

        const body = await req.json();
        const { id, ...data } = body;

        console.log('Request Body:', body);

        if (!id) {
            return NextResponse.json({ message: 'ID must be passed in the body.' }, { status: 400 });
        }

        if (Object.keys(data).length === 0) {
            return NextResponse.json({ message: 'Data to update must be passed in the body.' }, { status: 400 });
        }

        // Dynamically selecting the model
        // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
        const model = prisma[objectName as keyof typeof prisma] as { update: Function };

        if (!model || typeof model.update !== 'function') {
            return NextResponse.json({ message: 'Invalid object model.' }, { status: 400 });
        }

        const record = await model.update({
            where: { id },
            data,
        });

        console.log('Updated Record:', record);

        return NextResponse.json({ message: 'Record updated successfully', record }, { status: 200 });
    } catch (error: unknown) {
        console.error('Error updating record:', error);

        if ((error as PrismaClientKnownRequestError)?.code === 'P2025') { // Prisma specific error: record not found
            return NextResponse.json({ type: 'Database Error', message: 'Record not found.'  }, { status: 404 });
        }

        return NextResponse.json({ type: 'Internal Server Error', message: (error as Error)?.message }, { status: 500 });
    }
}

// POST /api/services/rest/?object=<objectName>
export async function POST(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const objectName = url.searchParams.get('object');

        if (!objectName) {
            return NextResponse.json({ message: 'Object must be passed in query params.' }, { status: 400 });
        }

        const body = await req.json();

        if (Object.keys(body).length === 0) {
            return NextResponse.json({ message: 'Data to create must be passed in the body.' }, { status: 400 });
        }

        // Dynamically selecting the model
        // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
        const model = prisma[objectName as keyof typeof prisma] as { create: Function };

        if (!model || typeof model.create !== 'function') {
            return NextResponse.json({ message: 'Invalid object model.' }, { status: 400 });
        }

        const record = await model.create({
            data: body,
        });

        console.log('Created Record:', record);

        return NextResponse.json({ message: 'Record created successfully', record }, { status: 201 });
    } catch (error: unknown) {
        console.error('Error creating record:', error);

        if ((error as PrismaClientKnownRequestError)?.code === 'P2002') { // Prisma specific error: unique constraint failed
            return NextResponse.json({ type: 'Database Error', message: 'Unique constraint failed.' }, { status: 409 });
        }

        return NextResponse.json({ type: 'Internal Server Error', message: (error as Error)?.message }, { status: 500 });
    }
}

// DELETE /api/services/rest/?object=<objectName>
export async function DELETE(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const objectName = url.searchParams.get('object');

        if (!objectName) {
            return NextResponse.json({ message: 'Object must be passed in query params.' }, { status: 400 });
        }

        const body = await req.json();

        if (Object.keys(body).length === 0) {
            return NextResponse.json({ message: 'Data to create must be passed in the body.' }, { status: 400 });
        }

        // Dynamically selecting the model
        // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
        const model = prisma[objectName as keyof typeof prisma] as { delete: Function };

        if (!model || typeof model.delete !== 'function') {
            return NextResponse.json({ message: 'Invalid object model.' }, { status: 400 });
        }

        const record = await model.delete({
            where: {
                id: body.id,
            }
        });

        console.log('Deleted Record:', record);

        return NextResponse.json({ message: 'Record deleted successfully', record }, { status: 201 });
    } catch (error: unknown) {
        console.error('Error creating record:', error);

        if ((error as PrismaClientKnownRequestError)?.code === 'P2002') { // Prisma specific error: unique constraint failed
            return NextResponse.json({ type: 'Database Error', message: 'Unique constraint failed.' }, { status: 409 });
        }

        return NextResponse.json({ type: 'Internal Server Error', message: (error as Error)?.message }, { status: 500 });
    }
}