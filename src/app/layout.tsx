// Importing built-in dependencies
import type { Metadata } from "next";
//import { Geist, Geist_Mono } from "next/font/google";

// Importing global styles
import "./globals.css";

// Configuring global fonts
/*const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});*/

// Configuring global page metadata
export const metadata: Metadata = {
	title: "RMAX",
	description: "Default landing page for RMAX Website",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body
				//className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				className="antialiased"
			>
				{children}
			</body>
		</html>
	);
}
