// Importing built-in dependencies
import React from "react";
import Image from 'next/image';

const GlobalMap: React.FC = () => {
    return (
        <>
        	<section 
                className="section section-margin relative w-full flex flex-col items-center justify-center"
            >
                <figure className="flex flex-col items-center justify-center">
                    <Image src="/icons/map.svg" alt="Homepage" width={1000} height={500} className="w-full h-auto"/>
                </figure>
				{/* <Image src="/icons/map.svg" alt="Homepage" fill={true}/> */}
			</section>
        </>
    );
}

export default GlobalMap;