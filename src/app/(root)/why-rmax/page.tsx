// Importing built-in dependencies
import React from "react";
import Image from "next/image";

// Importing components
import TopBanner from "@/components/sections/topBanner/topBanner";
import Workflow from "@/components/sections/workflow";

// Importing styles
import styles from "./whyrmax.module.css";


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

                <div className={`${styles['image-card-wrapper']} grid grid-cols-2 gap-6`}>
                    <ImageCard src="/images/why-rmax-card-overlay.png" caption="25,000 sqm facility"/>
                    <ImageCard src="/images/why-rmax-card-overlay.png" caption="30+ automated encapsulation lines"/>
                    <ImageCard src="/images/why-rmax-card-overlay.png" caption="High-speed SMT, welding & extrusion"/>
                    <ImageCard src="/images/why-rmax-card-overlay.png" caption="Monthly production of 1.5M meters of LED strips"/>
                    <ImageCard src="/images/why-rmax-card-overlay.png" caption="500,000+ linear luminaires/month"/>
                    <ImageCard src="/images/why-rmax-card-overlay.png" caption="QC processes ensuring reliability, water-resistance, and consistency"/>
                </div>
                <p className="text-sm color-grey mt-4">This foundation allows us to provide custom, high-quality, and cost-effective solutions with fast delivery worldwide.</p>
            </section>

            <section className={`${styles['split-card-div2']} section section-margin flex justify-between gap-12`}>
                <div className="flex flex-col justify-around py-6">
                    <span>
                        <h4 className="text-3xl font-bold">Our Professional Backbone</h4>
                        <p className="text-xs color-grey">We boast a highly qualified R&D team with specialists in:</p>

                    </span>
                    <ul className="ml-4 leading-3">
                        <li className="list-disc color-primary font-bold text-sm not-last:mb-1"><p className="color-grey">Optics & Light Engineering</p></li>
                        <li className="list-disc color-primary font-bold text-sm not-last:mb-1"><p className="color-grey">Material & Thermal Sciences</p></li>
                        <li className="list-disc color-primary font-bold text-sm not-last:mb-1"><p className="color-grey">Intelligent Controls</p></li>
                        <li className="list-disc color-primary font-bold text-sm not-last:mb-1"><p className="color-grey">Product Design & Aesthetics</p></li>
                    </ul>

                    <p className="text-xs color-grey">Coupled with a 20+ member QC team, every product is tested for durability, efficiency, and safety—meeting international standards including CE, CB, and UL certifications.</p>
                </div>

                <figure className="bg-[#D9D9D9] w-[45rem] h-[18rem] rounded-2xl overflow-hidden">

                </figure>
            </section>

            <section className="section section-margin">
                <h3 className="text-3xl font-bold mb-2">Design that Connects with the Market</h3>
                <p className="text-sm color-grey">RMAX launches new models quarterly, with customizable options across multiple price tiers. Our focus on trend-responsive, client-exclusive, and versatile product designs helps our partners maintain market edge.</p>

                <div className={`${styles['text-card-div']} my-6 flex justify-around`}>
                    <TextCard content="Industry-driven designs"/>
                    <TextCard content="Customer-exclusive collections"/>
                    <TextCard content="Multi-style, multi-tier offerings"/>
                </div>
            </section>

            <section className="section section-margin">
                <h3 className="text-3xl font-bold mb-2">Health-Conscious Lighting</h3>
                <p className="text-sm color-grey">We prioritize visual comfort and human health in every solution:</p>

                <div className={`${styles['text-card-div']} my-6 flex justify-around`}>
                    <TextCard content="High CRI"/>
                    <TextCard content="Flicker-free Performance"/>
                    <TextCard content="Anti-glare design"/>
                </div>
            </section>

            <section className={`${styles['split-card-div']} section section-margin flex flex-shrink-0 justify-between gap-16`}>
                <div className="flex flex-col justify-center py-6 pr-10 max-w-[38rem]">
                    <h4 className="text-3xl font-bold mb-2">Global Certifications <br/> You Can Trust</h4>
                    <p className="text-xs color-grey">RMAX is deeply committed to continuous research and development in both product innovation and smart technology integration. Every RMAX product undergoes rigorous testing through independent, third-party laboratories and meets multiple international quality and safety certifications — including CE, CB, UL, and other region-specific standards — ensuring global compliance and trusted performance</p>
                </div>

                <figure className="bg-[#D9D9D9] w-[108rem] h-[18rem] rounded-2xl overflow-hidden">

                </figure>
            </section>

            <Workflow />

            <section className="section section-margin">
                <h4 className="text-3xl font-bold">More Than Just Products – Complete Solutions</h4>
                <p className="text-xs color-grey">RMAX is a total solution provider—not just a product vendor We cater to projects across residential, commercial, and industrial sectors, adapting solutions based on budget, style, and local standards We offer:</p>

                <div className={`${styles['grey-card-wrapper']} grid grid-cols-3 gap-4 mt-6`}>
                    <GreyCard content="Lighting Proposals"/>
                    <GreyCard content="CAD Layouts"/>
                    <GreyCard content="Renderings"/>
                    <GreyCard content="Assembly Guides"/>
                    <GreyCard content="Product Videos, Catalogs & Sales Kits"/>
                    <GreyCard content="After-Sales support"/>
                </div>
            </section>

            <section className="section section-margin">
                <h4 className="text-3xl font-bold">Global Presence</h4>
                <p className="text-xs color-grey">RMAX is proudly active in:</p>

                <div className="grid gap-10 justify-items-center">
                    <FlagSection src="/images/flags/saudi.png" caption="Saudi Arabia" subcaption="HeadQuarters & Distribution"/>
                    
                    <div className="flex justify-center gap-6">
                        <FlagSection src="/images/flags/china.png" caption="China" subcaption="Manufacturing & R&D"/>
                        <FlagSection src="/images/flags/hongkong.png" caption="Hong Kong" subcaption="Export Office"/>
                    </div>

                    <div className="flex justify-center flex-wrap gap-6">
                        <FlagSection src="/images/flags/india.png" caption="India"/>
                        <FlagSection src="/images/flags/uae.png" caption="UAE"/>
                        <FlagSection src="/images/flags/oman.png" caption="Oman"/>
                        <FlagSection src="/images/flags/egypt.png" caption="Egypt"/>
                        <FlagSection src="/images/flags/bahrain.png" caption="Bahrain"/>
                        <FlagSection src="/images/flags/qatar.png" caption="Qatar"/>
                    </div>
                    
                </div>

            </section>

            <section className="section section-margin">
                <h4 className="text-3xl font-bold">Supporting Our Distributors</h4>
                
                <div className={`${styles['large-card-wrapper']} grid grid-cols-3 justify-items-center gap-10 mt-6`}>
                    <LargeTextCard title="Fast Delivery" subtitle="Warehouses in KSA, China, and UAE"/>
                    <LargeTextCard title="No MOQ" subtitle="On standard stock items for projects"/>
                    <LargeTextCard title="Full Project Support" subtitle="From product selection to layout and rendering"/>
                    <LargeTextCard title="Custom Solutions" subtitle="For exclusive or complex project needs"/>
                    <LargeTextCard title="On-site & Remote Tech Support" subtitle="On standard stock items for projects"/>
                    <LargeTextCard title="Professional Sales Team" subtitle="Ready to respond and resolve quickly"/>
                </div>
                
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
                        <div key={index} className={`${styles['branding-grid-wrapper']} flex flex-wrap items-center justify-between my-4`}>
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

const TextCard = ({ content }: {content: string}) => {
    return (
        <>
            <span className="border-[#BE1B1B] flex items-center justify-center border-2 px-5 py-3 rounded-lg color-primary font-bold w-[16rem] text-center">
                {content}
            </span>
        </>
    );
}

const LargeTextCard = ({ title, subtitle }: {title: string, subtitle: string}) => {
    return (
        <>
            <span className="border-[#BE1B1B] flex flex-col items-center justify-center border-2 px-5 py-3 rounded-lg color-primary w-[18rem] h-[8rem] text-center bg-[#FFD9D9]">
                <h6 className="text-xl font-semibold">{title}</h6>
                <p className="text-xs">{subtitle}</p>
            </span>
        </>
    );
}

const GreyCard = ({ content }: {content: string}) => {
    return (
        <>
            <span className="flex items-center justify-center px-5 py-3 rounded-lg text-xl f-primary font-bold h-[8rem] text-center bg-[#D9D9D9]">
                {content}
            </span>
        </>
    );
}

const FlagSection = ({ src, caption, subcaption }: {src: string, caption: string, subcaption?: string}) => {
    return (
        <div className={`${styles['flag-div']} w-42 aspect-[42/25] mt-6`}>
            <figure className="relative w-full h-full">    
                <Image src={src} alt="Country flag" fill={true}/>
            </figure>
            <p className="text-sm font-bold text-center">{caption}</p>
            <p className="text-xs color-grey text-center">{subcaption}</p>
        </div>
    );
}
