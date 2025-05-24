// Importing built-in dependencies
import React from "react";
import { PrismaClient } from "@prisma/client";

// Importing components
import Hero from "@/components/sections/hero/hero";
import WhyChooseUs from "@/components/sections/whyChooseUs/whyChooseUs";
import CTA from "@/components/sections/cta/cta";
import AboutUs from "@/components/sections/aboutUs/aboutUs";
import Stats from "@/components/sections/stats";
import Blog from "@/components/sections/blog/blog";
import ProductTypes from "@/components/sections/productTypes";
import LogoCarousel from "@/components/sections/logoCarousel";
import HomeProducts from "@/components/sections/homeProducts";
import GlobalMap from "@/components/sections/globalMap";

export default async function HomePage() {
	const prisma = new PrismaClient();

	const [carouselContents] = await Promise.all([
		prisma.carousel.findMany({ where: {isActive: true }, include: { image: true }})
	]);

	return (
		<>
			<Hero data={carouselContents}/>
			<WhyChooseUs/>
			<AboutUs/>
			<LogoCarousel/> {/* update:Red banner needs to be smaller, first section moves left, second section moves right */} 
			<ProductTypes/>
			<CTA/>
			<HomeProducts/>
			<Stats/>

			{/* <Customers/> update:No need - Naseef confirmed */}
			<GlobalMap/>
			<Blog/>
		</>

	);
};
