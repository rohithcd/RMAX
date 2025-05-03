const Stats: React.FC = () => {
    const stats = [
        {title: '10+', subtitle: 'Years Experience'},
        {title: '30+', subtitle: 'R&D Experts'},
        {title: '5+', subtitle: 'RMAX Shop'},
        {title: '350+', subtitle: 'Happy Customers'}
    ];

    return (
        <>
            <section className="section section-margin flex justify-around bg-[#f7f2f2] py-6">
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