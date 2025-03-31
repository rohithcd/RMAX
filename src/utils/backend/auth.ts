// Importing built-in dependencies
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

/**
 * Checks if the incoming request is authenticated.
 * @param {NextRequest} req - The incoming request object.
 * @returns {Promise<boolean>} - Returns `true` if the user is authenticated, otherwise `false`.
 */
export async function isAuthenticated(req: NextRequest): Promise<boolean> {
    const token = await getToken({ req });
    return !!token;
}