// Importing built-in dependencies
import React from "react";
import Image from 'next/image';

// Importing components
import Hero from "@/components/sections/hero/hero";
import WhyChooseUs from "@/components/sections/whyChooseUs/whyChooseUs";
import CTA from "@/components/sections/cta/cta";
import AboutUs from "@/components/sections/aboutUs/aboutUs";

const HomePage: React.FC = () => {
	return (
		<>
				<Hero/>
				<WhyChooseUs/>
				<AboutUs/>
				<CTA/>
				<section className="flex flex-col items-center justify-center max-w-6xl mx-auto py-4 px-4">
					<Image src="/icons/map.svg" alt="Homepage" width={1000} height={500} className="w-full h-auto"/>
				</section>

				{/* <Blog/> */}
		</>

	);
};

export default HomePage;
