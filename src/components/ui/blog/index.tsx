// Importing built-in dependencies
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogCardProps {
    imgSrc: string;
    imgAlt: string;
    title: string;
    link: string;
}

//Lighting the Perfect Brew: RMAX Lighting’s Café Solutions
const BlogCard: React.FC<BlogCardProps> = ({ imgSrc, imgAlt, title, link}) => {
    return (
        <>
            <div className={`w-full`}>
                <figure className="max-w-[40rem] w-full aspect-2/1 bg-[#585856] rounded-lg">
                    <Image src={imgSrc} alt={imgAlt}/>
                </figure>
                <p className="text-sm text-[#262626] font-semibold mt-2 mb-1">{title}</p>

                <Link href={link} className="text-xs color-primary">Read more</Link>
            </div>
        </>
    );
}

export default BlogCard;
