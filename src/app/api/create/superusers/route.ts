// Importing built-in dependencies
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import bcrypt from 'bcryptjs';

// Prisma client singleton (to prevent multiple instances)
const prisma = new PrismaClient();

// GET /api/create/superusers
export async function GET(request: NextRequest) {
    const { API_KEY, DEV_PASSWORD, ADMIN_PASSWORD, DEV_USERNAME, ADMIN_USERNAME, DEV_EMAIL, ADMIN_EMAIL } = process.env;

    if (!API_KEY || !DEV_PASSWORD || !ADMIN_PASSWORD || !DEV_USERNAME || !ADMIN_USERNAME || !DEV_EMAIL || !ADMIN_EMAIL) {
        return NextResponse.json({ message: 'Missing few of necessary environment variables (API_KEY, DEV_PASSWORD, ADMIN_PASSWORD, DEV_USERNAME, ADMIN_USERNAME, DEV_EMAIL, ADMIN_EMAIL)' }, { status: 400 });
    }

    // Validate API key from query parameters
    const apikey = new URL(request.url).searchParams.get('apikey');
   
    if(!apikey) {
        return NextResponse.json({ message: 'apikey is not provided in url parameters'}, {status: 400});
    }

    if(apikey !== API_KEY) {
        return NextResponse.json({ message: 'provided api key is invalid'}, {status: 400});
    }

    try {
        const usersData = [
            { username: ADMIN_USERNAME, password: await bcrypt.hash(ADMIN_PASSWORD, 10), email: ADMIN_EMAIL, name: 'Admin User' },
            { username: DEV_USERNAME, password: await bcrypt.hash(DEV_PASSWORD, 10), email: DEV_EMAIL, name: 'Developer User' }
        ];

        // Create users in the database
        await prisma.user.createMany({ data: usersData });

        return NextResponse.json({ message: 'Successfully created superusers'}, { status: 200});

    } catch(error: unknown) {
        console.error('Error: ', error);

        if(error instanceof PrismaClientKnownRequestError) {
            // P2002 - Indicates Unique Constraint Error on Postgres (Prisma)
            if(error.code === 'P2002') {
                return NextResponse.json({ message: 'Superuser records already exist in the database'}, { status: 409 });
            }
        }

        return NextResponse.json({ message: (error as Error).message || 'Internal server error'}, { status: 500 });
    }
    
}