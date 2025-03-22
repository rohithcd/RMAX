"use client"

// Importing built-in dependencies
import * as React from "react";
import { DropdownMenu } from "radix-ui";
import { PersonIcon } from "@radix-ui/react-icons";

const UserDropdown = () => {

	return (
		<DropdownMenu.Root>
            {/* DropdownMenu.Trigger is a component that triggers the dropdown menu */}
            {/* asChild prop is used to render the trigger as a child of the DropdownMenu */}
			<DropdownMenu.Trigger asChild>
				<button
					className="inline-flex size-[35px] items-center justify-center rounded-full bg-white text-violet11 shadow-[0_2px_10px] shadow-blackA4 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black"
					aria-label="Customise options"
				>
					<PersonIcon/>
				</button>
			</DropdownMenu.Trigger>

            {/* DropdownMenu.Portal is a component which gets attached to the triggered button */}
			<DropdownMenu.Portal>
				<DropdownMenu.Content
					className="min-w-[180px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
					sideOffset={3}
				>
					<DropdownMenu.Item className="group relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[5px] text-[13px] leading-none text-violet11 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1" disabled>
						My Account
					</DropdownMenu.Item>

                    <DropdownMenu.Separator className="m-[5px] h-px bg-violet6" />

					<DropdownMenu.Item className="group relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[5px] text-[13px] leading-none text-violet11 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1">
                        SignOut
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
};

export default UserDropdown;

