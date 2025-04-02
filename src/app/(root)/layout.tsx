// Importing built-in dependencies
import type { Metadata } from "next";
//import { Manrope, Archivo } from "next/font/google";

// Importing components
import Navbar from "@/components/sections/navbar/navbar";
import Footer from "@/components/sections/footer/footer";

// Configuring global fonts
// const manrope = Manrope({
// 	subsets: ["latin"],
// 	weight: ["400", "500", "600", "700"],
// 	variable: "--font-manrope",
// });

// const archivo = Archivo({
// 	subsets: ["latin"],
// 	weight: ["400", "500", "600", "700"],
// 	variable: "--font-archivo",
// });



// Configuring global page metadata
export const metadata: Metadata = {
	title: "RMAX",
	description: "Default landing page for RMAX Website",
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			<Navbar/>
			{children}
			<Footer/>
		</>
	);
}
