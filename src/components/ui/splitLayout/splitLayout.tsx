// Importing built-in dependencies
import Image from 'next/image';
import React from 'react';

import { Slide } from "react-awesome-reveal";

interface SplitLayoutProps {
    title: string;
    description: string | Array<string>;
    image: string;
    reverse: boolean;
}

const SplitLayout: React.FC<SplitLayoutProps> = ({ title, description, image, reverse=false}) => {
    return (
        <article className="grid grid-cols-2 gap-24 my-18">
            <div className={`self-center ${reverse ? 'order-2' : 'order-1'}`}>
                <Slide
                    direction={reverse ? 'right' : 'left'}
                    triggerOnce={true}
                    duration={900}
                >
                    <h3 className="text-3xl font-semibold mb-3">{title}</h3>
                
                    {Array.isArray(description) ? (
                        description.map((desc, index) => (
                            <p key={index} className="text-sm color-grey mb-2">{desc}</p>
                        ))
                    ) : (
                        <p className="text-sm color-grey">{description}</p>
                    )}
                </Slide>

            </div>

            <figure className={`${reverse ? 'order-1' : 'order-2'}`}>
                <Slide
                    direction={reverse ? 'left' : 'right'}
                    triggerOnce={true}
                    duration={1000}
                    className="relative  min-h-75 overflow-hidden rounded-2xl "
                >
                    <Image src={image} alt="Image" fill={true}/>
                </Slide>
            </figure>

        </article>
    );
};

export default SplitLayout;