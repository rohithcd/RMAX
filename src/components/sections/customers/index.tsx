// Importing built-in dependencies
import React from "react";
import Image from 'next/image';

const Customers: React.FC = () => {

    return (
        <>
            <section className="section section-margin flex">
                <div className="bg-color-primary rounded-xl w-[20rem] h-[20rem] text-stone-50 flex flex-col justify-center items-center text-center gap-4 px-3">
                    <figure className="relative rounded-full w-10 h-10 bg-stone-50">
                        <Image src="/icons/phone.svg" alt="Phone" fill={true} className="p-1"/>
                    </figure>

                    <span>
                        <h6 className="text-sm">Call Us For Shoping</h6>
                        <h5>0761-8523-398</h5>
                    </span>

                    <p className="text-xs">We always ready to assist you with your meat selection and answer any questions you may have.</p>
                    <button className="bg-transparent font-light text-sm border-1 border-stone-50 rounded-sm w-26 h-9">Call Now</button>
                </div>


                <figure className="relative flex flex-col justify-between ml-6 w-[24rem] h-[20rem]">
                    <Image src="/images/person-1.png" alt="Person 1" width={220} height={110}/>
                    <Image src="/images/person-2.png" alt="Person 2" width={220} height={110}/>
                </figure>

                <div className="flex flex-col justify-between">
                    <span>
                        <h4 className="text-4xl font-bold mb-4">Our <span className="color-primary">Customers</span>.</h4>
                        <p className="text-sm text-c-black">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum printing and typesetting industry. Lorem sumprinting and </p>
                    </span>

                    <span className="border-1 rounded-lg px-8 py-6 border-[#BE1B1B]">
                        <p className="text-sm color-grey">&quot;Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum, Lorem Ipsum is simply dummy text&quot;</p>
                        
                        <div className="flex justify-between mt-8">
                            <span className="flex gap-4">
                                <figure className="w-12 h-12 rounded-full bg-[#585656]"></figure>
                                <span>
                                    <h6>David Roy</h6>
                                    <p className="text-sm color-grey">Designation</p>
                                </span>
                            </span>

                            <Image src="/icons/quotes.svg" alt="Quotes" width={50} height={50}/>
                        </div>
                    </span>
                </div>
            </section>
        </>
    );
}

export default Customers;