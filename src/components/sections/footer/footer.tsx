// Importing built-in dependencies
import React from 'react';
import Image from 'next/image';
import { RMAX_LOGO } from '@/config/constants';

// Importing styles
import styles from './footer.module.css';

// Importing constants
import { FOOTER_CONTENTS } from '@/config/constants';


const Footer = () => {
    return (
        <footer className="section flex flex-col items-center my-4">
            <div className="flex justify-between items-start w-full my-4">
                <div className="flex flex-col gap-2 w-1/5">
                    <Image src={RMAX_LOGO} alt="RMAX Logo" width={150} height={78} className="pointer-events-none"/>

                    <p className={`${styles['color-grey']} text-xs`}>{FOOTER_CONTENTS.description}</p>

                    {/* Social Icons */}
                    <span className="flex gap-1">
                        <Image src="/icons/fb.svg" alt="facebook" width={20} height={20}/>
                        <Image src="/icons/insta.svg" alt="instagram" width={20} height={20}/>
                        <Image src="/icons/linkedin.svg" alt="linkedin" width={20} height={20}/>
                        <Image src="/icons/yt.svg" alt="youtube" width={20} height={20}/>
                    </span>

                </div>

                <div className="flex justify-between gap-26">
                    <ul>
                        <h5 className={`${styles['color-red']} text-lg font-semibold mb-2`}>Quick Links</h5>

                        {FOOTER_CONTENTS.quickLinks.map((link) => (
                            <li key={link.name} className="list-disc text-sm ml-4 leading-6">{link.name}</li>
                        ))}

                    </ul>

                    <div>
                        <h5 className={`${styles['color-red']} text-lg font-semibold mb-2`}>Our Stores</h5>

                        <div className="grid grid-cols-3 gap-1">
                            {FOOTER_CONTENTS.ourStores.map((link) => (
                                <Image key={link.name} src={link.flag} width="52" height="35" alt="Flag"/>
                            ))}
                        </div>
                    </div>

                    {/* Section - Information */}
                    <div className="max-w-48">
                        <h5 className={`${styles['color-red']} text-lg font-semibold mb-2`}>Information</h5>

                        {/* Sub Section - Location */}
                        <div>
                            <span className="flex items-center gap-3 font-medium">
                                <Image src="/icons/marker.svg" alt="marker" width={18} height={18}/>
                                <h6>Location</h6>
                            </span>

                            <p className={`${styles['color-grey']} pl-8 text-xs f-manrope text-justify`}>
                                <strong className={styles['color-dark-grey']}>Head Office (HK): </strong>
                                4, 16/F, HoKing Commercial Centre, Fayuen St, Kowloon Hong Kong<br/>
                                <strong className={styles['color-dark-grey']}>(UAE): </strong> RMAX Middle East FZE Jumeirah Business Center 
                                Jumeirah Lakes Towers P.O. Box 17476, Dubai UAE
                            </p>
                        </div>

                        {/* Sub Section - Phone */}
                        <div className="mt-1">
                            <span className="flex items-center gap-3 font-medium">
                                <Image src="/icons/phone.svg" alt="phone" width={18} height={18}/>
                                <h6>Phone</h6>
                            </span>

                            <p className={`${styles['color-grey']} pl-8 text-xs f-manrope`}>
                                0761-8523-398
                            </p>
                        </div>

                        {/* Sub Section - Phone */}
                        <div className="mt-1">
                            <span className="flex items-center gap-3 font-medium">
                                <Image src="/icons/mail.svg" alt="mail" width={18} height={18}/>
                                <h6>Phone</h6>
                            </span>

                            <p className={`${styles['color-grey']} pl-8 text-xs f-manrope`}>
                                <a href="mailto:contact@rmaxled.com" className="hover:underline">contact@rmaxled.com</a>
                            </p>
                        </div>

                    </div>


                </div>

            </div>

            <p className={`${styles['border-color']} text-xs border-t-1 w-full text-center pt-3`}>&copy; {new Date().getFullYear()} RMAX. All rights reserved.</p>

        </footer>
    )
}

export default Footer;