'use client';

// Importing built-in dependencies
import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';

//import styles from './navItem.module.css';

// Importing utility functions
import { cn } from "@/utils/frontend/tailwind-util";

interface NavItemProps {
	href: string;
	label: string;
	children: React.ReactNode;
}

export function NavItem({ href, label, children }: NavItemProps) {
	const pathname = usePathname();

	return (
		// <Tooltip>
		//   <TooltipTrigger asChild>
		<Link
			href={href}
			className={clsx(
				`flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8`,
				{ 'bg-accent text-black': pathname === href }
			)}
		>
			{children}
			<span className="sr-only">{label}</span>
		</Link>
		//   </TooltipTrigger>
		//   <TooltipContent side="right">{label}</TooltipContent>
		// </Tooltip>
	);
}

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
	React.ElementRef<typeof TooltipPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
	<TooltipPrimitive.Content
		ref={ref}
		sideOffset={sideOffset}
		className={cn(
			"z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
			className
		)}
		{...props}
	/>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
