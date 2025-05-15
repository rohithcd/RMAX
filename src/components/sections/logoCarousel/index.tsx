import Image from "next/image";

import styles from './logoCarousel.module.css';

const LogoCarousel = () => {
    return (
        <>
        	<section className="section-margin w-full overflow-hidden">
                <div className="bg-color-primary h-[8rem] mb-2">
                    <div className={`flex items-center justify-around h-full ${styles['1animate-scroll-left']} whitespace-nowrap`}>
					    <Image src="/images/logos/aramco.png" alt="Aramco" width={160} height={90}/>
                        <Image src="/images/logos/neom.png" alt="Neom" width={130} height={60}/>
                        <Image src="/images/logos/riyadh-metro.png" alt="Riyadh Metro" width={130} height={60}/>
                        <Image src="/images/logos/modon.png" alt="Modon" width={130} height={60}/>
                        <Image src="/images/logos/riyadh-cable.png" alt="Riyadh Cable" width={130} height={60}/>
				    </div>
                </div>
		

                <div className="bg-color-primary h-[8rem] mb-2">
                    <div className={`flex items-center justify-around h-full ${styles['1animate-scroll-left']} whitespace-nowrap`}>
					    <Image src="/images/logos/riyadh-expo.png" alt="Riyadh Expo 2030" width={160} height={90}/>
                        <Image src="/images/logos/arabic.png" alt="Riyadh Region Company" width={130} height={60}/>
                        <Image src="/images/logos/riyadh-metro.png" alt="Riyadh Metro" width={130} height={60}/>
                        <Image src="/images/logos/modon.png" alt="Modon" width={130} height={60}/>
                        <Image src="/images/logos/riyadh-cable.png" alt="Riyadh Cable" width={130} height={60}/>
				    </div>
                </div>
			</section>
        </>
    );
}

export default LogoCarousel;