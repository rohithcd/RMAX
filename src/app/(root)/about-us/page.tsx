// Importing built-in dependencies
import React from "react";
import Image from "next/image";

// Importing components
import TopBanner from "@/components/sections/topBanner/topBanner";
import SplitLayout from "@/components/ui/splitLayout/splitLayout";
import TextBanner from "@/components/sections/textBanner/textBanner";

// Importing constants
import { STORIES_CONTENTS as contents } from "@/config/constants";
import TextCard from "@/components/ui/textCard/textCard";


const HomePage: React.FC = () => {
	return (
		<>
			<TopBanner src="/images/aboutus-overlay.png" title="About Us" subtitle="Home / About Us"/>
			<section className="section my-8">
				<div className="mb-8">
					<h3 className="text-3xl font-bold pb-2">About <span className="color-primary">RMAX</span></h3>
					<p className="text-xs color-grey">Founded in 2009, RMAX group is a global pioneer in the lighting industry, delivering cutting-edge, intelligent, and sustainable solutions under its flagship RMAX brand. With expertise spanning residential, commercial, and industrial sectors, RMAX fuses top-tier craftsmanship with advanced technology to create premium lighting experiences worldwide—where innovation meets reliability.</p>
				</div>

				<div className="flex justify-center gap-4 h-30 mb-8">
					<TextCard head="30+ Years" subhead="Professional Excellence in Architectural Lighting"/>
					<TextCard head="30+ R&D Experts" subhead="A Team of Experts with Over 10 Years of Innovation Experience"/>
					<TextCard head="3200+ SKUs" subhead="Expanding to Over 6000 SKUs Offering a Wide Range of Product Selections"/>
				</div>
				
				<div className="mb-12">
					<h3 className="text-3xl font-bold pb-2">Why <span className="color-primary">RMAX?</span></h3>
					<p className="text-xs color-grey">At RMAX, we go beyond delivering premium lighting and electrical solutions. We are committed to meeting the needs of our partners, focusing on customer satisfaction, building brand trust, and enhancing competitiveness. Our goal is to create lasting value and drive success for all our partners.</p>
				</div>

				<div>
					<h3 className="text-3xl font-bold pb-2"><span className="color-primary">RMAX</span> Culture</h3>
					<p className="text-xs color-grey mb-2">At RMAX, every solution is crafted with passion and precision. We are driven by a commitment to innovation, energy efficiency, and sustainability, knowing that light plays a vital role in enhancing people’s quality of life. Wherever light is needed, RMAX is there—delivering solutions that inspire comfort, productivity, and well-being. </p>
					<p className="text-xs color-grey mb-2">We aim to raise living standards by making innovative, stylish, and professional lighting and electrical products accessible to homes, businesses, and large-scale projects. We understand the importance of every investment—whether it’s a home, office, or facility—and we are dedicated to supporting those investments with products that offer lasting quality and value. </p>
					<p className="text-xs color-grey">RMAX is committed to improving communities, actively contributing to the well-being of residents and businesses through modern technologies and diverse solutions tailored to their evolving needs. With a focus on customer success and satisfaction, we strive for excellence in everything we do.</p>
				</div>
			</section>

			
			<section className="section py-4">
				<h3 className="text-3xl font-bold pb-2 text-left">Map of Countries</h3>
				<figure className="flex flex-col items-center justify-center">
					<Image src="/icons/map.svg" alt="Homepage" width={1000} height={500} className="w-full h-auto"/>
				</figure>
				<p className="text-sm color-grey mt-4">RMAX, headquartered in Saudi Arabia, has extended its reach across  <strong>HongKong, Oman, UAE, Qatar, Egypt, Bahrain, India and China.</strong> Our mission is to deliver innovative and high-quality lighting solutions, tailored to meet the unique demands of each market while upholding the highest industry standards.</p>
			</section>
			<TextBanner />
			<section className="max-w-6xl mx-auto px-4">
				{contents?.map((item, index) => (
					<SplitLayout
						key={index}
						title={item.title}
						description={item.description}
						image={item.image}
						reverse={index % 2 !== 0}
					/>
				))}
			</section>
		</>
	);
};

export default HomePage;
