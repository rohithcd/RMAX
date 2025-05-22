// Importing built-in dependencies
import React from 'react';

// Importing components
import BlogCard from '@/components/ui/blog';

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
                <BlogCard imgSrc='' imgAlt='' title='Lighting the Perfect Brew: RMAX Lighting’s Café Solutions' link=''/>
                <BlogCard imgSrc='' imgAlt='' title='Lighting the Perfect Brew: RMAX Lighting’s Café Solutions' link=''/>
            </div>
        </section>
    );
};

export default BlogSection;