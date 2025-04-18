// Importing built-in dependencies
import React from "react";

// Importing components
import TopBanner from "@/components/sections/topBanner/topBanner";
import SplitLayout from "@/components/ui/splitLayout/splitLayout";

// Importing constants
import { STORIES_CONTENTS as contents } from "@/config/constants";

const HomePage: React.FC = () => {
	return (
		<>
			<TopBanner title="About Us" subtitle="Home / About Us"/>
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
