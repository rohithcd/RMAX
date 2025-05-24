import { toUrlSlug } from "@/utils/frontend/formatter";
import Image from "next/image";
import Link from "next/link";

const ProductFilter = ({ products, filters }) => {
    return (
        <section className="section section-margin flex gap-8">
            <aside className="w-[20rem] flex-shrink-0">
                <span className="flex gap-2 items-center mb-2">
                    <Image src="/icons/filter.svg" alt="filter" width={18} height={18} />
                    <h5 className="text-xl font-semibold">Filter</h5>
                </span>


                <span className="relative">
                    <input
                        className="outline-[#BE1B1B] outline-1 rounded-md py-3 px-4 text-sm text-black w-full"
                        type="text"
                        placeholder="Search Product"
                        name="search"
                        required
                    ></input>
                    <Image src="/images/search.png" alt="search" width={20} height={20} className="absolute top-0.5 right-3" />
                </span>


                <h6 className="text-lg font-semibold mt-4 my-1">Categories</h6>

                <ul>
                    {filters.categories?.map((item: Record<string, string>, index: string) => (
                        <li key={index} className="flex justify-between">
                            <Link href={item.link}>{item.name}</Link>
                        </li>
                    ))}
                </ul>

                <h6 className="text-lg font-semibold mt-4 mb-1">Sub Categories</h6>

                <div className="flex flex-wrap gap-2">
                    <Tag content="Outdoor lighting" />
                    <Tag content="Home lighting" />
                    <Tag content="Exhibition" />
                    <Tag content="Home lighting" />
                    <Tag content="Exhibition" />
                    <Tag content="Outdoor lighting" />
                    <Tag content="Home lighting" />
                    <Tag content="Exhibition" />
                    <Tag content="Home lighting" />
                    <Tag content="Exhibition" />
                </div>
            </aside>

            <div className="grid grid-cols-3 gap-8 w-full">
                {products.map((item: Record<string, unknown>) => (
                    <Link key={item.name as string} href={`/products/details/${toUrlSlug(item.name)}`}>
                        <Product name={item.name} />
                    </Link>
                ))}
                
            </div>
        </section>
    );
}

const Product = ({ name }: {name: string}) => {
    return (
        <div className="relative flex flex-col items-center h-[18rem] w-[16rem]">
            <figure className="z-2 relative bg-[#d9d9d9] overflow-hidden rounded-4xl h-[15rem] w-[14rem]">
                <Image src="/images/demo/product1.png" alt="Product Image" fill={true} />
            </figure>
            <div className="flex items-end justify-center px-5 py-3 absolute top-48 bg-color-primary rounded-2xl h-[6rem] w-[16rem]">
                <p className="text-sm text-stone-50">{name}</p>
            </div>
        </div>
    )
}

const Tag = ({ content }: {content: string}) => {
    return (
        <>
            <span
                className="border-1 border-c-primary rounded-md px-2 py-1"
            >
                {content}
            </span>
        </>
    );
}

export default ProductFilter;