import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";

import { SidebarTrigger } from "./ui/sidebar";

export default function Header() {
	return (
		<header className="p-4 flex items-center bg-gray-800 text-white shadow-lg">
			<button
				className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
				aria-label="Open menu"
				type="button"
			>
				<Menu size={24} />
			</button>
			<SidebarTrigger />
			<h1 className="ml-4 text-xl font-semibold">
				<Link to="/">
					<img
						src="/tanstack-word-logo-white.svg"
						alt="TanStack Logo"
						className="h-10"
					/>
				</Link>
			</h1>
		</header>
	);
}
