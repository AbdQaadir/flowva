import { Bell, Menu } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";

type Props = {
	title: string;
	description: string;
	actionButtons?: React.ReactNode;
};
function AppHeader({ title, description, actionButtons }: Props) {
	return (
		<div className="flex items-center justify-between gap-2">
			<SidebarTrigger className="w-12 h-12" asChild>
				<Menu className="h-6! w-6!" />
			</SidebarTrigger>
			<div className="flex-1 flex flex-col gap-2">
				<h2 className="text-xl font-semibold leading-4">{title}</h2>
				<p className="text-sm">{description}</p>
			</div>
			<div className="flex items-center gap-4">
				<Button size="icon-lg" variant="secondary" className="rounded-full">
					<Notification />
				</Button>

				{actionButtons}
			</div>
		</div>
	);
}

const Notification = () => {
	return (
		<div className="flex items-center gap-4">
			<Bell className="w-6 h-6 text-gray-900" fill="currentColor" />
		</div>
	);
};

export default AppHeader;
