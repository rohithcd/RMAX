// Importing built-in dependencies
import React from "react";

// Importing components
import Carousel from "@/components/ui/carousel/carousel";
import WhyChooseUs from "@/components/sections/whyChooseUs/whyChooseUs";

const HomePage: React.FC = () => {
	return (
		<>
				<Carousel/>
				<WhyChooseUs/>
		</>

	);
};

export default HomePage;
