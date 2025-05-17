// Importing built-in components
import Image from "next/image";

// Importing custom components
import Button from "@/components/ui/button/button";

// Importing styles
import styles from "./homeProducts.module.css";

const HomeProducts = () => {
    return (
        <>
            <section className={`${styles['products-div']} section section-margin grid grid-cols-3 gap-8 place-items-center`}>
                <div className={`${styles['products-first-item']}`}>  
                    <p className="text-xs">RMAX Choice</p>

                    <h3 className="text-3xl font-bold mb-3">Our Most <span className="color-primary">Popular</span> Products</h3>
                    <p className="text-xs color-grey mb-3">Welcome to our online shop, where quality meets lights in every cut. Our top-selling products are sure to impress even the most discerning palate.</p>

                    <Button name="View All"/>
                </div>

                <Product/>
                <Product/>
                <Product/>
                <Product/>
                <Product/>


            </section>
        </>
    );
}

const Product = () => {
    return (
        <div className="relative flex flex-col items-center h-[18rem] w-[16rem]">
            <figure className="z-2 relative bg-[#d9d9d9] overflow-hidden rounded-4xl h-[15rem] w-[14rem]">
                <Image src="/images/demo/product1.png" alt="Product Image" fill={true} />
            </figure>
            <div className="flex items-end justify-between px-5 py-3 absolute top-48 bg-color-primary rounded-2xl h-[6rem] w-[16rem]">
                <p className="text-sm text-stone-50">Sky eye</p>
                <p className="text-sm text-stone-50">10</p>
            </div>
        </div>
    )
}

export default HomeProducts;