"use client";

// Importing built-in dependencies
import React, { useEffect } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

// Importing styles
import styles from "./carousel.module.css";
import Button from "../button/button";

interface CarouselItem {
    src: string;
    alt: string;
}

interface CarouselProps {
    items: CarouselItem[];
}

const items = [
    {
        src: '/images/carousel-image1.png',
        alt: 'anything'
    },

    {
        src: '/images/carousel-image1.png',
        alt: 'anything'
    }
]
export function Carousel({ items1 }: CarouselProps) {
    const [emblaRef] = useEmblaCarousel({ loop: true });


    return (
        <>
            <div className="w-full overflow-hidden" ref={emblaRef}>
                {/* Map through the props array to create slides dynamically */}
                <div className={`${styles.embla__container} flex`}>
                    {items?.length > 0 ? (
                        items.map((item, index) => (
                            <div className={`${styles.embla__slide} relative`} key={index}>
                                <Image
                                    src={item.src}
                                    alt={item.alt}
                                    fill={true}
                                    className="object-cover"
                                />

                                <div className="absolute z-2 flex justify-center items-center w-full h-full">
                                    <article className="text-stone-50 flex gap-7 flex-col items-center w-xl">
                                        <h6 className="text-xs">LED Mastery</h6>
                                        <h1 className="text-5xl font-bold text-center">The Ultimate <span className="color-primary">Luminance</span> <br/> Lover's Destination.</h1>

                                        <p className="text-xs text-center">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla itaque rerum nesciunt. Repellendus maxime recusandae deserunt, omnis tempore, veritatis, id repudiandae ullam facilis dolorum sit quisquam tempora qui accusantium incidunt!</p>
                                        <Button name="About Us" href='/about-us'></Button>
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

export default Carousel;
