// Importing built-in dependencies
import Link from 'next/link';
import React from 'react';

// Importing components
import Button from '@/components/ui/button/button';

// Importing styles
import styles from './blog.module.css';

const BlogSection: React.FC = () => {

    return (
        <section className="section section_margin">
            <div>
                <p className="text-xs font-medium">Product Talk</p>

                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold mt-4">Discover Our <span className="color-primary">RMAX</span> Blog.</h2>
                    <Button name="View All"/>
                </div>
            </div>

            <div className={`${styles['blog-div']} w-full flex gap-6 justify-between mt-8`}>
                <BlogCard/>
                <BlogCard/>
            </div>
        </section>
    );
};

const BlogCard: React.FC = () => {
    return (
        <>
            <div className={`w-full`}>
                <figure className="max-w-[40rem] w-full aspect-2/1 bg-[#585856] rounded-lg">

                </figure>
                <p className="text-sm text-[#262626] font-semibold mt-2 mb-1">Lighting the Perfect Brew: RMAX Lighting’s Café Solutions</p>

                <Link href="https://google.com" className="text-xs color-primary">Read more</Link>
            </div>
        </>
    );
}

export default BlogSection;