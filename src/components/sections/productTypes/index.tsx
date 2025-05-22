// Importing built-in dependencies
//import Link from 'next/link';
import React from 'react';

// Importing components
import Button from '@/components/ui/button/button';

// Importing styles
import styles from './productTypes.module.css';

const ProductTypes: React.FC = () => {
    return (
        <>
            <section className="section section_margin">
                <div className="text-center mb-4">
                    <p className="text-xs font-medium">Quality Product</p>
                    <h3 className="text-3xl font-bold my-3">First Choice <span className="color-primary">Professional Lightning</span></h3>
                    <p className={`${styles['p-text']} w-[46rem] mx-auto text-sm color-grey`}>Discover our wide-ranging RMAX product lineup, where advanced design meets real-world practicality. Whether you’re transforming a cozy living area or upgrading large-scale commercial spaces, our solutions illuminate every moment—enhancing comfort, functionality, and style.</p>
                </div>
                
                <div className="flex gap-6 overflow-x-scroll items-stretch scrollbar-hide">
                    <ProductCard title="Outdoor" description="Light up your surroundings and highlight the beauty of every outdoor space with robust, weather-resistant fixtures."/>
                    <ProductCard title="Indoor" description="Our indoor lighting solutions strike the perfect balance between functionality and style for home and office"/>
                    <ProductCard title="Iot Solutions" description="Stay connected and in control. Integrate smart lighting for streamlined, energy-efficient environments."/>
                    <ProductCard title="Switches & Sockets" description="Embrace contemporary design and user-friendly features. Our switches and sockets bring both practicality and modern flair to any setting."/>
                    <ProductCard title="Electrical Wiring" description="Ensure secure and reliable energy distribution with quality wiring solutions that power your world."/>
                </div>

                <div className="text-center mt-6">
                    <Button name="View All" />
                </div>
                
            </section>
        </>
    );
}

interface ProductCardProps {
    title: string;
    description: string;
}

const ProductCard: React.FC<ProductCardProps> = ({title, description}) => {
    return (
        <div className="flex flex-col justify-end w-60 h-40 flex-shrink-0 border-1 hover:border-c-primary px-4 pb-3 rounded-md">
            <h6>{title}</h6>
            <p className="text-xs color-grey">{description}</p>
        </div>
    );
}

export default ProductTypes;