// Importing built-in dependencies
import React from "react";
import Image from 'next/image';

// Importing components
import TopBanner from "@/components/sections/topBanner/topBanner";


const ProjectsPage: React.FC = () => {
    return (
        <>
            <TopBanner src="/images/aboutus-overlay.png" title="Projects" subtitle="Home / Projects"/>
            
            <section className="section section-margin">
                <h2 className="text-4xl font-bold mb-2">Lighting the World’s Landmark Spaces with <span className="color-primary">RMAX</span></h2>
                <p className="text-sm color-grey">RMAX proudly delivers advanced lighting and electrical solutions to some of the most renowned and influential projects worldwide. From exclusive residential complexes to high-profile commercial developments, and from public sector initiatives to green urban spaces, our expertise lies in blending aesthetic brilliance with functional performance.
                 <br/> Our solutions are tailored to achieve flawless integration, technical reliability, and architectural impact, continually raising the bar in the lighting and smart technology industries.</p>

                 <div className="flex w-full my-8 gap-8">
                    <div className="flex flex-col gap-4">
                        <TextCard content="Exterior and Architectural Lighting Installations"/>
                        <TextCard content="Hotel & Resort Lighting Concepts"/>
                        <TextCard content="Park, Landscape, and Garden Illumination"/>
                        <TextCard content="Smart Urban Infrastructure & IoT-Driven Projects"/>
                        <TextCard content="Government-Endorsed Solar Street Lighting"/>
                        <TextCard content="Complete Lighting & Electrical Systems for Urban and Industrial Projects"/>

                        <p className="text-center px-32">At <span className="color-primary font-bold">RMAX</span>, we turn creative visions into reality — lighting spaces with innovation, purpose, and precision.</p>

                        <div className="grid grid-cols-2 gap-4">
                            <ImageCard src="/images/why-rmax-card-overlay.png" caption="25,000 sqm facility"/>
                            <ImageCard src="/images/why-rmax-card-overlay.png" caption="25,000 sqm facility"/>
                            <ImageCard src="/images/why-rmax-card-overlay.png" caption="25,000 sqm facility"/>
                            <ImageCard src="/images/why-rmax-card-overlay.png" caption="25,000 sqm facility"/>
                        </div>
                        
                    </div>

                    <aside className="w-[20rem]">
                        <h5 className="text-xl font-semibold mb-2">Search</h5>

                        <span className="relative">
                            <input 
                                className="outline-[#BE1B1B] outline-1 rounded-md py-3 px-4 text-sm text-black w-full" 
                                type="text" 
                                placeholder="Search" 
                                name="search" 
                                required
                            ></input>
                            <Image src="/images/search.png" alt="search" width={20} height={20} className="absolute top-0 right-3"/>
                        </span>
                        

                        <h6 className="text-lg font-semibold mt-4 my-1">Categories</h6>

                        <ul>
                            <li className="flex justify-between"><p># Solution</p><span>(00)</span></li>
                            <li className="flex justify-between"><p># Project</p><span>(00)</span></li>
                            <li className="flex justify-between"><p># News</p><span>(00)</span></li>
                        </ul>
                    </aside>

                 </div>
            </section>


        </>

    );
};

const TextCard = ({ content }: {content: string}) => {
    return (
        <>
            <span className="w-full h-[4rem] border-[#BE1B1B] flex items-center justify-center border-2 px-5 py-3 rounded-lg color-primary font-bold text-center">
                {content}
            </span>
        </>
    );
}

interface ImageCardProps {
    src: string;
    caption: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ src, caption}) => {
    return (
        <figure className="relative bg-[#D9D9D9] w-full h-[18rem] mt-6 rounded-4xl overflow-hidden">
            <Image src={src} alt="Why RMAX card image" fill={true}/>
            <figcaption className="w-full absolute bottom-0 f-primary text-sky-50 text-lg py-8 px-6 align-bottom" style={{backgroundColor: "rgba(190, 27, 27, 0.7)"}}>{caption}</figcaption>
        </figure>
    );
}

export default ProjectsPage;
