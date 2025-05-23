// Importing built-in dependencies
import React from 'react';
import Image from 'next/image';
import { Slide } from 'react-awesome-reveal';

// Importing components
import Button from '@/components/ui/button/button';

// Importing constants
import { WHY_CHOOSE_US_CONTENTS as contents } from '@/config/constants';

// Importing styles
import styles from './whyChooseUs.module.css';


interface BoxProps {
    title: string;
    description: string;
}

const WhyChooseUs: React.FC = () => {
    return ( 
        <Slide  
            direction="up"
            triggerOnce={true}
            duration={1000}
            delay={100}
        >
            <section className={`${styles['section-style']} section section-margin py-1 flex justify-between gap-4`}>
                <figure className={`${styles['section-figure']} relative h-[340px] w-[720px] rounded-2xl overflow-hidden shadow-lg`}>
                    <Image src="/images/why-choose-us.png" alt="Why Choose Us" fill={true} className="object-cover" />
                    <div className="absolute z-2 p-10">
                        <h2 className="f-primary text-5xl font-semibold text-stone-50">{contents.title}</h2>
                        <p className="text-stone-50 text-sm font-thin mt-4">{contents.description}</p>
                        <Button className="mt-4" href={contents.buttonHref} name={contents.buttonName}></Button>
                    </div>
                </figure>    

                <div className={`${styles['box-container']} grid grid-cols-2 gap-4`}>
                    {contents.cardContents.map((item, index) => (
                        <Box key={index} title={item.title} description={item.description} />
                    ))}
                </div>
            </section>
        </Slide>   
    )
}

const Box: React.FC<BoxProps> = ({ title, description }) => {
    return (
        <div className={`${styles['shadow']} flex flex-col items-start rounded-md p-4 min-h-[80] min-w-[120]`}>
            <h3 className="color-primary f-primary text-base font-semibold">{title}</h3>
            <p className="text-gray-600 text-xs">{description}</p>
        </div>
    );
}

export default WhyChooseUs;