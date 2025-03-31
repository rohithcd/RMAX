// Routes on /api/auth/* will be handled by nextauth.ts method
import { authOptions, getSession } from "@/utils/backend/nextauth";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
export { getSession }
//export const runtime = 'edge';