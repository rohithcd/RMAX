// Importing built-in dependencies
import React from "react";
import Image from 'next/image';

// Importing components
import Hero from "@/components/sections/hero/hero";
import WhyChooseUs from "@/components/sections/whyChooseUs/whyChooseUs";
import CTA from "@/components/sections/cta/cta";
import AboutUs from "@/components/sections/aboutUs/aboutUs";
import Stats from "@/components/sections/stats";
import Customers from "@/components/sections/customers";
import Blog from "@/components/sections/blog/blog";
import ProductTypes from "@/components/sections/productTypes";
import LogoCarousel from "@/components/sections/logoCarousel";
import HomeProducts from "@/components/sections/homeProducts";

const HomePage: React.FC = () => {
	return (
		<>
			<Hero/>
			<WhyChooseUs/>
			<AboutUs/>
			<LogoCarousel/> {/* update:Red banner needs to be smaller, first section moves left, second section moves right */} 
			<ProductTypes/>
			<CTA/>
			<HomeProducts/>
			<Stats/>
			<Customers/> {/*update:No need - Naseef confirmed */}

			<section className="section section-margin relative w-full h-[40rem] flex flex-col items-center justify-center">
				<Image src="/icons/map.svg" alt="Homepage" fill={true}/>
			</section>
			
			<Blog/>
		</>

	);
};

export default HomePage;
