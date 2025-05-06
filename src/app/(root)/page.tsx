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

const HomePage: React.FC = () => {
	return (
		<>
			<Hero/>
			<WhyChooseUs/>
			<AboutUs/>
			<CTA/>
			<Stats/>
			<Customers/>
			<section className="section section-margin relative w-full h-[40rem] flex flex-col items-center justify-center">
				<Image src="/icons/map.svg" alt="Homepage" fill={true}/>
			</section>
			
			<Blog/>
		</>

	);
};

export default HomePage;
