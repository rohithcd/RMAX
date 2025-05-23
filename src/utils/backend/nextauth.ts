// Importing built-in dependencies
import CredentialsProvider from "next-auth/providers/credentials"; // Allows login using local database
import { AuthOptions, getServerSession } from "next-auth"
import { PrismaClient, User } from '@prisma/client';
import { JWT } from "next-auth/jwt";
import bcrypt from "bcryptjs";

// Importing contants
import { RMAX_LOGO } from "@/config/constants";


const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },

            async authorize(credentials) {
                const username = credentials?.username;
                const password = credentials?.password;

                if (!username || !password) {
                    throw new Error('Username or password is not provided.');
                }

                try {
                    const prisma = new PrismaClient();
                    const user = await prisma.user.findFirst({ where: { username }});

                    console.log('User: ', user);

                    if(!user) {
                        throw new Error('User not found!!');
                    }

                    //validate password
                    const passwordIsValid = await bcrypt.compare(password, user.password);

                    if (!passwordIsValid) {
                        throw new Error('Invalid credentials');
                    }

                    return {
                        id: user.id.toString(),
                        username: user.username,
                    };

                } catch(error: unknown) {
                    console.log('Error occurred while fetching the user: ', error);

                    throw new Error('Error occurred while fetching the user')
                }
            },
        })
    ],
    session: {
        strategy: "jwt",
    },

    secret: process.env.NEXTAUTH_SECRET, // Secret for JWT signing

    pages: {
        //error: '/error', // Error code passed in query string as ?error=
    },

    callbacks: {
        async jwt({ token, user }: { token: JWT, user: unknown}) {
            if (user) {
                token.username = (user as User).username;
            }

            return token;
        },

        async session({ session, token }) {
            if (session && session.user) {
                session.user.name = token.username as string;
            }

            return session
        }
    },

    theme: {
        colorScheme: "light", // "auto" | "dark" | "light"
        brandColor: "#ff0000", // Hex color code
        logo: RMAX_LOGO, // Absolute URL to image
        buttonText: "#FF0000" // Hex color code
    }
};

/**
 * Helper function to get the session on the server without having to import the authOptions object every single time
 * @returns The session object or null
 */
const getSession = () => getServerSession(authOptions)

export { authOptions, getSession }