// Importing built-in dependencies
import React from "react";

// Importing components
import Button from "@/components/ui/button/button";

// Importing styles
import styles from './contactForm.module.css';

const ContactForm: React.FC = () => {
    return (
        <>
            <section className="section section-margin">
                <div className="flex flex-col gap-1 items-start mb-4">
                    <h3 className="text-4xl font-semibold">WOULD YOU LIKE TO KNOW MORE ABOUT THE POTENTIAL OF LIGHT</h3>
                    <h4 className="text-xl">JOIN US</h4>
                    <p className="text-xs">Become our distributor</p>
                    <span className="bg-color-primary p-1.5 rounded-lg text-sm font-semibold text-stone-50">Partner with us</span>
                </div>

                <div className="flex flex-col gap-4 mb-4">
                    <div className={`${styles['input-wrapper']} flex justify-between w-full gap-4`}>
                        <input className="outline-[#BE1B1B] outline-1 rounded-md py-3 px-4 text-sm text-black w-full" type="text" placeholder="First Name" name="firstname" required></input>
                        <input className="outline-[#BE1B1B] outline-1 rounded-md py-3 px-4 text-sm text-black w-full" type="text" placeholder="Last Name" name="lastname" required></input>
                    </div>

                    <div className={`${styles['input-wrapper']} flex justify-between w-full gap-4`}>
                        <input className="outline-[#BE1B1B] outline-1 rounded-md py-3 px-4 text-sm text-black w-full" type="email" placeholder="Email" name="email" required></input>
                        <input className="outline-[#BE1B1B] outline-1 rounded-md py-3 px-4 text-sm text-black w-full" type="tel" placeholder="Phone" name="phone" required></input>
                    </div>

                    <div className={`${styles['input-wrapper']} flex justify-between gap-4 w-1/2 pr-2`}>
                        <input className="outline-[#BE1B1B] outline-1 rounded-md py-3 px-4 text-sm w-full text-black" type="text" placeholder="Country" name="country" required></input>
                    </div>

                    <textarea className="outline-[#BE1B1B] outline-1 rounded-md py-3 px-4 text-sm text-black w-full" placeholder="Message" rows={5}></textarea>
                </div>

                <Button name="Submit"/>
            </section>
        </>

    );
};

export default ContactForm;
