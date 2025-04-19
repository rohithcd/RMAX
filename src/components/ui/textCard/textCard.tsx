interface CardProps {
    head: string;
    subhead: string;
    description?: string;
}

const TextCard: React.FC<CardProps> = ({ head, subhead, description }) => {
    return (
        <div className="flex flex-col justify-center items-center text-stone-50 rounded-lg bg-color-primary px-2 text-center">
            <h3 className="text-3xl font-bold">{head}</h3>
            <h6 className="text-sm font-thin">{subhead}</h6>
            {description && <p>{description}</p>}
        </div>
    );
}

export default TextCard;