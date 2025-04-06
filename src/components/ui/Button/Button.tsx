"use client"
// Importing built-in dependencies
import { useRef } from 'react';
import { useRouter } from 'next/navigation';

// Importing styles
import styles from './button.module.css';


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    name: string;
    className?: string;
    href?: string;
}

const Button = ({ name, className, ...props }: ButtonProps) => {
    const router = useRouter();

    const buttonRef = useRef<HTMLButtonElement>(null);

    function createRipple(event: React.MouseEvent<HTMLButtonElement>) {
        const button = buttonRef.current;
        if (!button) return;

        // Remove any existing ripple
        const existingRipple = button.querySelector(`.${styles['ripple']}`);
        if (existingRipple) existingRipple.remove();
    
        // Create new ripple
        const circle = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        Object.assign(circle.style, {
            width: `${diameter}px`,
            height: `${diameter}px`,
            left: `${event.clientX - rect.left - radius}px`,
            top: `${event.clientY - rect.top - radius}px`,
            position: 'absolute',
        });

        circle.classList.add(styles['ripple']);
        button.appendChild(circle);
    };

    function btnClick(e: React.MouseEvent<HTMLButtonElement>) {
        if (props.onClick) {
            props.onClick(e);
        }

        if (props.href) {
            router.push(props.href);
        }
    }

    return (
        <button 
            ref={buttonRef}
            onClick={(e) => {
                createRipple(e);
                btnClick(e);
            }}

            className={`${className} 
                relative min-w-24 bg-color-primary py-2 text-stone-50 
                font-thin align-center f-manrope overflow-hidden
                text-xs rounded-sm cursor-pointer`
            } {...props}
        >{name}
        </button>
    );
}

export default Button;

