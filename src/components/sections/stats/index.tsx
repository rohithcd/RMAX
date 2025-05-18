// Importing built-in dependencies
import React from "react";

// Importing styles
import styles from './stats.module.css';

const Stats: React.FC = () => {
    const stats = [
        {title: '10+', subtitle: 'Years Experience'},
        {title: '30+', subtitle: 'R&D Experts'},
        {title: '5+', subtitle: 'RMAX Shop'},
        {title: '350+', subtitle: 'Happy Customers'}
    ];

    return (
        <>
            <section className={`${styles['stats-div']} section section-margin flex justify-around gap-6 flex-wrap bg-[#f7f2f2] py-6`}>
                {stats.map((stat, index) => (
                    <span key={index} className="text-center color-primary">
                        <h4 className="text-3xl font-semibold">{stat.title}</h4>
                        <p className="text-sm font-semibold">{stat.subtitle}</p>
                    </span>
                ))}
            </section>
        </>
    );
}

export default Stats;