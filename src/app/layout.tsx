// Importing built-in dependencies
import type { Metadata } from "next";
import { Manrope, Archivo } from "next/font/google";

// Importing global styles
import "./globals.css";

// Configuring global fonts
const manrope = Manrope({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-manrope",
});

const archivo = Archivo({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-archivo",
});



// Configuring global page metadata
export const metadata: Metadata = {
	title: "RMAX",
	description: "Default landing page for RMAX Website",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body
				className={`${archivo.variable} ${manrope.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
