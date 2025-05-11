import React from 'react';
import Image from 'next/image';

const content = [
    {title: "Request & Project Review", description: "We quickly process your inquiry and collect all essential documents — such as construction drawings, CAD layouts, specifications, and design preferences — to fully assess the project’s scope, style, budget, and timeline."},
    {title: "Tailored Lighting & Electrical Proposal", description: "Based on the review, our technical team develops a customized solution, including product recommendations, layout suggestions, and a clear cost estimate tailored to your project goals."},
    {title: "Sample Confirmation", description: "We prepare and send samples for evaluation and approval, allowing you to verify materials, finishes, colors, and technical specifications before moving into production."},
    {title: "Pilot Run & Mass Production", description: "Following sample approval, we initiate a trial production batch for quality validation. Once verified, we proceed with full-scale manufacturing under strict timelines and supervision."},
    {title: "Quality Control & Shipment", description: "All products undergo thorough quality inspections. We provide detailed photos and videos for your final review before shipment, ensuring transparency and peace of mind."},
    {title: "After-Sales Support", description: "Our commitment doesn’t end with delivery. RMAX provides responsive after-sales service, including technical guidance, installation support, and warranty coverage, ensuring long-term customer satisfaction."}
]

const Workflow = () => {
    return (
        <section className="section section-margin">
            <h3 className="text-3xl font-bold mb-2">RMAX Procedures Workflow</h3>
            <p className="text-sm color-grey">From Inquiry to Installation – Seamless Execution at Every Step</p>

            <div className="mt-4 flex flex-col items-center">
                {content.map((item, index) => {
                    return (
                        <React.Fragment key={index}>
                            <div className="border-2 rounded-lg text-center p-4 border-[#BE1B1B] w-full">
                                <h6 className="color-primary font-bold">{`${index + 1}. ${item.title}`}</h6>
                                <p className="text-sm color-grey">{item.description}</p>
                            </div>
                            {content.length !== index + 1 && <Image src="/icons/downarrow.svg" alt="down arrow" width={16} height={16} /> }
                            
                        </React.Fragment>
                    );
                })}
            </div>
            
        </section>
    );
}

export default Workflow;