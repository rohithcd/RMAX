// Importing built-in dependencies
import React from "react";

// Importing components
import TopBanner from "@/components/sections/topBanner/topBanner";


const News: React.FC = () => {
    return (
        <>
            <TopBanner src="/images/aboutus-overlay.png" title="News" subtitle="Home / News"/>

            <section className="section section-margin">
                <h2 className="text-4xl font-bold mb-2">Explore What’s New at <span className="color-primary">RMAX</span></h2>
                <p className="text-sm color-grey">Stay ahead with the latest from RMAX — your trusted partner in lighting and electrical innovation. From next-gen product launches to major project highlights, industry trends, and breakthrough technologies, this is where we share our journey of innovation and growth. Whether it’s a smart lighting solution, a regional success story, or an insight into the future of energy-efficient systems, the RMAX Newsroom keeps you inspired and informed — one update at a time.</p>
            </section>
            
        </>

    );
};

export default News;
