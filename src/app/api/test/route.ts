// Importing dependencies
//import { query } from '@/utils/backend/db-connect';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

// GET /api/users
export async function GET() {
	// try {
	const prisma = new PrismaClient();

	const users = await prisma.user.findMany();

	console.log('Users: ', users);
	

	// 	console.log('User: ' + users);

	// 	return NextResponse.json(users);
	// } catch (err: unknown) {
	// 	console.log('Error: ', err);

	return NextResponse.json(
			{ message: users},
			{ status: 500 }
		);
}

// POST /api/users
export async function POST() {

}