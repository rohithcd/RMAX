// Importing built-in dependencies
import React from "react";

// Importing components
import TopBanner from "@/components/sections/topBanner/topBanner";
import ContactForm from "@/components/sections/contactForm";

const ContactPage: React.FC = () => {
    return (
        <>
            <TopBanner src="/images/aboutus-overlay.png" title="Contact Us" subtitle="Home / Contact Us"/>
            <ContactForm/>
        </>

    );
};

export default ContactPage;
