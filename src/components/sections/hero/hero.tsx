"use client";

// Importing built-in dependencies
import React, { useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

// Importing constants
import { HERO_CONTENTS } from "@/config/constants";

// Importing components 
import Button from "../../ui/button/button";

// Importing styles
import styles from "./hero.module.css";

interface HeroProps {
	data: Record<string, unknown>[]
}

const Hero: React.FC<HeroProps> = ({ data }) => {
	const contents = (Array.isArray(data) && data.length !== 0) ? data : HERO_CONTENTS; 
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
									src={(item.image) ? `/api/services/file/${(item.image as Record<string, string>).fileName}` : HERO_CONTENTS[0].filePath as string}
									alt={`Carousel image ${index + 1}`}
									fill
									className="object-cover"
								/>

								<div className="absolute z-10 flex justify-center items-center w-full h-full">
									<article className="text-stone-50 flex gap-7 flex-col items-center w-2xl text-center px-4">
										<h6 className="text-sm">{item.subTitle as string}</h6>
										<h1
											className="text-5xl font-bold"
											dangerouslySetInnerHTML={{ __html: item.title as string }}
										/>
										<p className="text-sm">{item.description as string}</p>
										<Button name="About Us" href="/about-us" />
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
						className={`w-2 h-2 rounded-full ${index === selectedIndex ? 'bg-[#BE1B1B]' : 'bg-gray-300'
							}`}
						aria-label={`Go to slide ${index + 1}`}
					/>
				))}
			</div>
		</div>
	)
}


export default Hero;