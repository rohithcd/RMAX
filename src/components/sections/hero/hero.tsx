"use client";

// Importing built-in dependencies
import React, { useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

// Importing constants
import { HERO_CONTENTS as contents } from "@/config/constants";

// Importing components 
import Button from "../../ui/button/button";

// Importing styles
import styles from "./hero.module.css";

function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)

  // ✅ Auto-scroll
  useEffect(() => {
    if (!emblaApi) return

    const interval = setInterval(() => {
      if (!emblaApi) return
      emblaApi.scrollNext()
    }, 4000)

    return () => clearInterval(interval)
  }, [emblaApi])

  // ✅ Track current index for dots
  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }

    emblaApi.on('select', onSelect)
    onSelect() // Initial set
  }, [emblaApi])

  return (
    <div className="w-full overflow-hidden">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className={`${styles.embla__container} flex`}>
          {contents?.length > 0 ? (
            contents.map((item, index) => (
              <div className={`${styles.embla__slide} relative`} key={index}>
                <Image
                  src={item.img}
                  alt={item.alt}
                  fill
                  className="object-cover"
                />

                <div className="absolute z-10 flex justify-center items-center w-full h-full">
                  <article className="text-stone-50 flex gap-7 flex-col items-center w-2xl text-center px-4">
                    <h6 className="text-sm">{item.subHeading}</h6>
                    <h1
                      className="text-5xl font-bold"
                      dangerouslySetInnerHTML={{ __html: item.title }}
                    />
                    <p className="text-sm">{item.description}</p>
                    <Button name={item.button} href={item.href} />
                  </article>
                </div>
              </div>
            ))
          ) : (
            <div className={`${styles.embla__slide} text-center`}>
              No items available
            </div>
          )}
        </div>
      </div>

      {/* ✅ Dot indicators */}
      <div className="w-full absolute flex justify-center gap-2 -mt-4 z-11">
        {contents.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`w-2 h-2 rounded-full ${
              index === selectedIndex ? 'bg-black' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}


// export function Hero() {
//     const [emblaRef] = useEmblaCarousel({ loop: true });

//     return (
//         <>
//             <div className="w-full overflow-hidden" ref={emblaRef}>
//                 {/* Map through the props array to create slides dynamically */}
//                 <div className={`${styles.embla__container} flex`}>
//                     {contents?.length > 0 ? (
//                         contents.map((item, index) => (
//                             <div className={`${styles.embla__slide} relative`} key={index}>
//                                 <Image
//                                     src={item.img}
//                                     alt={item.alt}
//                                     fill={true}
//                                     className="object-cover"
//                                 />

//                                 <div className="absolute z-2 flex justify-center items-center w-full h-full">
//                                     <article className="text-stone-50 flex gap-7 flex-col items-center w-xl">
//                                         <h6 className="text-sm">{item.subHeading}</h6>
//                                         <h1 className="text-5xl font-bold text-center" dangerouslySetInnerHTML={{__html: item.title}}></h1>

//                                         <p className="text-sm text-center">{item.description}</p>
//                                         <Button name={item.button} href={item.href}></Button>
//                                     </article>

//                                 </div>

                                
//                             </div>
//                         ))
//                     ) : (
//                         <div className={`${styles.embla__slide} text-center`}>No items available</div>
//                     )}
//                 </div>
//             </div>
//         </>
//     );
// }

export default Hero;
