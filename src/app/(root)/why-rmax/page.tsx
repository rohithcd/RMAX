// Importing built-in dependencies
import React from "react";
import Image from "next/image";

// Importing components
import TopBanner from "@/components/sections/topBanner/topBanner";


const WhyRMAX: React.FC = () => {
    return (
        <>
            <TopBanner src="/images/why-rmax-overlay.png" title="Why RMAX" subtitle="Home / Why RMAX"/>

            <section className="section section-margin"> 
                <h3 className="text-4xl font-bold mb-2">Global Partner for Smart Lighting & Electrical Systems</h3>
                <p className="text-sm color-grey">At RMAX, we are committed to transforming spaces through intelligent lighting and electrical solutions. Our dedication goes beyond products — we bring innovation, performance, and style together to enhance every architectural experience. From residences to commercial spaces, we create tailored solutions that combine cutting-edge design, sustainable technology, and reliable function.</p>

                <div className="flex gap-4 justify-around flex-wrap my-8">
                    <StatCircle content="10+ Years"/>
                    <StatCircle content="50+ R&D Experts"/>
                    <StatCircle content="6000+ SKUs"/>
                    <StatCircle content="#1 Global Brand"/>
                </div>
            </section>

            <Branding/>

            <section className="section section-margin">
                <h3 className="text-4xl font-bold mb-2">Beyond Light – Into the Details</h3>
                <p className="text-sm color-grey">At RMAX, we believe light is not just about brightness—it&apos;s about well-being, aesthetics, and experience. With a human-first design philosophy, we provide lighting and electrical solutions that elevate both form and function, from indoor comfort to outdoor security.</p>

                <figure className="bg-[#D9D9D9] w-full h-[21rem] mt-6 rounded-lg"></figure>
            </section>

            <section className="section section-margin">
                <h3 className="text-4xl font-bold mb-2">Manufacturing Excellence</h3>
                <p className="text-sm color-grey">Our state-of-the-art factory in China supports a fully integrated production process:</p>

                <div className="grid grid-cols-2 gap-6">
                    <ImageCard src="/images/why-rmax-card-overlay.png" caption="25,000 sqm facility"/>
                    <ImageCard src="/images/why-rmax-card-overlay.png" caption="30+ automated encapsulation lines"/>
                    <ImageCard src="/images/why-rmax-card-overlay.png" caption="High-speed SMT, welding & extrusion"/>
                    <ImageCard src="/images/why-rmax-card-overlay.png" caption="Monthly production of 1.5M meters of LED strips"/>
                    <ImageCard src="/images/why-rmax-card-overlay.png" caption="500,000+ linear luminaires/month"/>
                    <ImageCard src="/images/why-rmax-card-overlay.png" caption="QC processes ensuring reliability, water-resistance, and consistency"/>
                </div>
                <p className="text-sm color-grey mt-4">This foundation allows us to provide custom, high-quality, and cost-effective solutions with fast delivery worldwide.</p>
            </section>

            <section className="section section-margin">

            </section>

        </>
    );
};

export default WhyRMAX;

interface StatCircleProps {
    content: string;
}

const StatCircle: React.FC<StatCircleProps> = ({ content }) => {
    return (
        <div className="bg-color-primary w-[10rem] h-[10rem] rounded-full grid place-items-center px-6">
            <h4 className="text-2xl font-extrabold text-sky-50 text-center">{content}</h4>
        </div>
    );
}


const Branding: React.FC = () => {
    const contents = [
        {
            title: "<span class='color-primary'>R</span> - Reliability",
            description: "Dependable performance, long-lasting quality, trusted partnerships",
            image: "/images/why-rmax/reliability.png"
        },
        {
            title: "<span class='color-primary'>M</span> - Modern",
            description: "Sleek, future-ready designs aligned with global trends",
            image: "/images/why-rmax/modern.png"
        },
        {
            title: "<span class='color-primary'>A</span> - Affordable",
            description: "Customized solutions for diverse regional and project-specific needs",
            image: "/images/why-rmax/affordable.png"
        },
        {
            title: "<span class='color-primary'>X</span> - Excellence",
            description: "Driven by innovation, committed to high standards in everything we do",
            image: "/images/why-rmax/excellence.png"
        }
    ];

    return (
        <>
            <section className="section section-margin">
                <h5 className="text-4xl font-semibold">Why RMAX</h5>
                
                    {contents.map((item, index) => (
                        <div key={index} className="flex items-center justify-between my-4">
                            <span>
                                <h3 className="text-5xl font-bold mb-2" dangerouslySetInnerHTML={{ __html: item.title }}></h3>
                                <p className="text-xs color-grey">{item.description}</p>
                            </span>

                            <figure className="bg-[#D9D9D9] rounded-lg w-[28rem] h-[6.5rem]">

                            </figure>
                        </div>
                    ))}
            </section>
        </>
    );
}

interface ImageCardProps {
    src: string;
    caption: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ src, caption}) => {
    return (
        <figure className="relative bg-[#D9D9D9] w-full h-[21rem] mt-6 rounded-4xl overflow-hidden">
            <Image src={src} alt="Why RMAX card image" fill={true}/>
            <figcaption className="w-full absolute bottom-0 f-primary text-sky-50 text-lg py-8 px-6 align-bottom" style={{backgroundColor: "rgba(190, 27, 27, 0.7)"}}>{caption}</figcaption>
        </figure>
    );
}
