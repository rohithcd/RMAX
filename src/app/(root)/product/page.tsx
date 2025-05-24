// Importing built-in dependencies
import React from "react";
//import Image from "next/image";

// Importing components
import Button from "@/components/ui/button/button";
import SplitLayout from "@/components/ui/splitLayout/splitLayout";
import Link from "next/link";


const Product: React.FC = () => {
    return (
        <>
            <section className="section section-margin"> 
                <div className="flex justify-between gap-12">
                    <figure className="w-[28rem] h-[20rem] bg-[grey] rounded-lg shrink-0">

                    </figure>

                    <div className="flex flex-col gap-3 items-start">
                        <h4 className="text-3xl font-bold border-b-1 border-b-black pb-2 self-stretch">Cloud light Pro</h4>
                        <p className="text-sm">LED adjustable Downlight Discover the ILLUS Advanced LED Adjustable Downlight, designed to bring elegance and versatility to both home and professional environments. It combines small size with high lumen output and wattage options, making it a versatile and powerful lighting solution. Whether for home or professional environments, it delivers efficient, stylish, and customizable lighting that meets the superior standards of quality and performance.</p>

                        <Button href='' name='Enquiry Now'/>
                    </div>
                </div>
            </section>

            <section className="section section-margin">
                <SplitLayout title="People - Centered Lighting & Electrical Solutions" description="Our human-centric approach drives the development of indoor and outdoor lighting, smart IoT solutions, and wiring devices. Whether it's chandeliers, streetlights, bollards, switches, or sockets, every RMAX product is designed to improve comfort, productivity, and lifestyle." image='' reverse={false}/>
                <SplitLayout title="People - Centered Lighting & Electrical Solutions" description="Our human-centric approach drives the development of indoor and outdoor lighting, smart IoT solutions, and wiring devices. Whether it's chandeliers, streetlights, bollards, switches, or sockets, every RMAX product is designed to improve comfort, productivity, and lifestyle." image='' reverse={true}/>
                <SplitLayout title="People - Centered Lighting & Electrical Solutions" description="Our human-centric approach drives the development of indoor and outdoor lighting, smart IoT solutions, and wiring devices. Whether it's chandeliers, streetlights, bollards, switches, or sockets, every RMAX product is designed to improve comfort, productivity, and lifestyle." image='' reverse={false}/>
                <SplitLayout title="People - Centered Lighting & Electrical Solutions" description="Our human-centric approach drives the development of indoor and outdoor lighting, smart IoT solutions, and wiring devices. Whether it's chandeliers, streetlights, bollards, switches, or sockets, every RMAX product is designed to improve comfort, productivity, and lifestyle." image='' reverse={true}/>
            </section>

            <section className="section section-margin">
                <h6 className="text-sm text-stone-50 border-b-1 border-b-black text-center">
                    <span className="inline-block bg-color-primary px-2 pt-1.5 pb-0.5 rounded-t-2xl">Specifications</span>
                </h6>

                <div className="mt-4">
                    <div className="flex items-center gap-2">
                        <h5 className="text-2xl font-bold">Model No.</h5>
                        <Button href='#' name="Download Here" className="py-0"/>
                    </div>

                    <div className="">
                        <ModelCard model="LI614215" description="4.5W / 3000K/4000K / 250lm / Aluminum+PC / IP65 / CRI 80 / 180° / 5V / 35,000h" />
                        <ModelCard model="LI614215" description="4.5W / 3000K/4000K / 250lm / Aluminum+PC / IP65 / CRI 80 / 180° / 5V / 35,000h" downloadUrl="https://google.com"/>
                        <ModelCard model="LI614215" description="4.5W / 3000K/4000K / 250lm / Aluminum+PC / IP65 / CRI 80 / 180° / 5V / 35,000h" downloadUrl="https://google.com"/>
                    </div>
                </div>
            </section>
        </>
    );
};

interface ModelCardProps {
    model: string;
    description: string;
    downloadUrl?: string;
}

const ModelCard: React.FC<ModelCardProps> = ({ model, description, downloadUrl}) => {
    return (
        <>
            <div className="flex justify-between items-center border-b-1 border-b-black my-4 pb-2">
                <div className="w-full flex justify-between items-center">
                    <h6 className="font-semibold">{model}</h6>
                    <p className="text-sm">{description}</p>
                </div>

                {downloadUrl && (
                    <Link href={downloadUrl} className="ml-4 text-blue-500 hover:underline">
                        Download
                    </Link>
                )}
            </div>

        </>
    );
}

export default Product;
