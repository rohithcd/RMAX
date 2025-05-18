"use client"

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import styles from './logoCarousel.module.css';


const LogoCarousel = () => {

const logoArray = [
    { src: '/images/logos/aramco.png', alt: "Aramco", width: 160, height: 90 },
    { src: '/images/logos/neom.png', alt: "Neom", width: 130, height: 60 },
    { src: '/images/logos/riyadh-metro.png', alt: "Riyadh Metro", width: 130, height: 60 },
    { src: '/images/logos/modon.png', alt: "Modon", width: 130, height: 60 },
    { src: '/images/logos/riyadh-cable.png', alt: "Riyadh Cable", width: 130, height: 60 }
];


    const [width, setWidth] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get the width of the content to determine how far to animate
    if (scrollRef.current) {
      // This will be the width of one set of logos
      setWidth(scrollRef.current.offsetWidth);
    }
  }, [logoArray]);

    return (
        <>
        	<section className="section-margin w-full overflow-hidden">
                <div className="bg-color-primary h-[8rem] mb-2 overflow-hidden">
                    <motion.div
                        className="flex items-center gap-16 h-full whitespace-nowrap"
                        animate={{ x: ["0%", "-100%"] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                        {[...new Array(3)].fill(0).map((_, index) => (
                            <React.Fragment key={index}>
                                {logoArray.map((row) => (
                                    <Image key={row.alt} src={row.src} alt={row.alt} width={row.width} height={row.height}/>
                                ))}
                            </React.Fragment>
                        ))}
                    </motion.div>
                </div>

                <div className="bg-color-primary h-[8rem] mb-2 overflow-hidden">
                    <motion.div
                        className="flex items-center gap-16 h-full whitespace-nowrap"
                        animate={{ x: ["-100%", "0%"] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                        {[...new Array(3)].fill(0).map((_, index) => (
                            <React.Fragment key={index}>
                                {logoArray.map((row) => (
                                    <Image key={row.alt} src={row.src} alt={row.alt} width={row.width} height={row.height}/>
                                ))}
                            </React.Fragment>
                        ))}
                    </motion.div>
                </div>
		
                {/* <div className="bg-color-primary h-[8rem] mb-2">
                    <div className={`flex items-center justify-around h-full ${styles['animate-scroll-right2']} whitespace-nowrap`}>
					    <Image src="/images/logos/riyadh-expo.png" alt="Riyadh Expo 2030" width={160} height={90}/>
                        <Image src="/images/logos/arabic.png" alt="Riyadh Region Company" width={130} height={60}/>
                        <Image src="/images/logos/riyadh-metro.png" alt="Riyadh Metro" width={130} height={60}/>
                        <Image src="/images/logos/modon.png" alt="Modon" width={130} height={60}/>
                        <Image src="/images/logos/riyadh-cable.png" alt="Riyadh Cable" width={130} height={60}/>
				    </div>
                </div> */}
			</section>
        </>
    );
}

export default LogoCarousel;