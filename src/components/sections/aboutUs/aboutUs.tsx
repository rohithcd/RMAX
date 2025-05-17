// Importing built-in dependencies
import React from 'react';
import Image from 'next/image';
import { Slide } from 'react-awesome-reveal';

// Importing components
import Button from '@/components/ui/button/button';
import TextCard from '@/components/ui/textCard/textCard';

import styles from './aboutUs.module.css';

const AboutUs: React.FC = () => {
    return (
        <Slide  
            direction="up"
            triggerOnce={true}
            duration={1000}
            delay={100}
        >
            <section className={`${styles['section-styles']} section section-margin flex gap-8`}>
                <div>
                    <p className="text-xs font-medium">Prime Products</p>
                    <h2 className="text-3xl font-bold mt-4">The Story Behind <span className="color-primary"><br/>RMAX</span> Shop.</h2>
                    <p className="text-xs color-grey pb-3">At RMAX, we redefine excellence in lighting and electrical solutions. With a commitment to innovation, craftsmanship, and sustainability, we provide high-quality products that enhance every space.</p>

                    <ul className="flex flex-col gap-2 pb-8">
                        <li>
                            <span className={`${styles['list-item']} flex gap-2`}>
                                <Image src="/icons/check.svg" alt="Check" width={16} height={16}/>
                                <h6 className="text-sm">Craftsmanship and Tradition</h6>
                            </span>

                            <p className="pl-6 text-xs color-grey">Blending modern technology with expert craftsmanship for superior performance.</p>
                        </li>

                        <li>
                            <span className={`${styles['list-item']} flex gap-2`}>
                                <Image src="/icons/check.svg" alt="Check" width={16} height={16}/>
                                <h6 className="text-sm">Quality and Sustainability</h6>
                            </span>

                            <p className="pl-6 text-xs color-grey">Designed for long-lasting efficiency with energy-saving solutions.</p>
                        </li>
                    </ul>

                    <Button name="Read More"/>

                </div>

                <div className={`${styles['image-div']} grid grid-cols-[210px_240px] grid-rows-[97px_97px_97px] gap-4`}>
                    <figure className="row-span-3 relative">
                        <Image src="/images/aboutUs-card.png" alt="About Us" fill={true} className="rounded-2xl"/>
                    </figure>
                    
                    <TextCard
                        head="10+"
                        subhead="Years of Excellence"
                    />

                    <TextCard
                        head="30+"
                        subhead="R&D Experts"
                    />

                    <TextCard
                        head="Our Vision"
                        subhead="Innovative Solutions"
                    />
                </div>
            </section>
        </Slide>
    );
};

export default AboutUs;