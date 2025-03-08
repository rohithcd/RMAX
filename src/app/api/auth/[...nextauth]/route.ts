// Routes on /api/auth/* will be handled by auth.ts method
import { authOptions } from "@/utils/backend/auth"
import NextAuth from "next-auth"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
//export const runtime = 'edge';