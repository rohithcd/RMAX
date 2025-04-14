"use client";

// Importing built-in dependencies
import React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

// Importing constants
import { HERO_CONTENTS as contents } from "@/config/constants";

// Importing components 
import Button from "../../ui/button/button";

// Importing styles
import styles from "./hero.module.css";

export function Hero() {
    const [emblaRef] = useEmblaCarousel({ loop: true });

    return (
        <>
            <div className="w-full overflow-hidden" ref={emblaRef}>
                {/* Map through the props array to create slides dynamically */}
                <div className={`${styles.embla__container} flex`}>
                    {contents?.length > 0 ? (
                        contents.map((item, index) => (
                            <div className={`${styles.embla__slide} relative`} key={index}>
                                <Image
                                    src={item.img}
                                    alt={item.alt}
                                    fill={true}
                                    className="object-cover"
                                />

                                <div className="absolute z-2 flex justify-center items-center w-full h-full">
                                    <article className="text-stone-50 flex gap-7 flex-col items-center w-xl">
                                        <h6 className="text-xs">{item.subHeading}</h6>
                                        <h1 className="text-5xl font-bold text-center" dangerouslySetInnerHTML={{__html: item.title}}></h1>

                                        <p className="text-xs text-center">{item.description}</p>
                                        <Button name={item.button} href={item.href}></Button>
                                    </article>

                                </div>

                                
                            </div>
                        ))
                    ) : (
                        <div className={`${styles.embla__slide} text-center`}>No items available</div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Hero;
