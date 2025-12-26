import { useRouterState } from "@tanstack/react-router";
import {
	Calendar,
	Compass,
	CreditCard,
	Gem,
	Home,
	Layers,
	LogOut,
	UserRoundCog,
} from "lucide-react";
import {
	Sidebar,
	SidebarContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/providers/auth-provider";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Spinner } from "./ui/spinner";

const items = [
	{
		title: "Home",
		url: "/",
		icon: Home,
	},
	{
		title: "Discover",
		url: "#",
		icon: Compass,
	},
	{
		title: "Library",
		url: "#",
		icon: Calendar,
	},
	{
		title: "Tech Stack",
		url: "#",
		icon: Layers,
	},
	{
		title: "Subscriptions",
		url: "#",
		icon: CreditCard,
	},
	{
		title: "Rewards Hub",
		url: "/rewards",
		icon: Gem,
	},
	{
		title: "Settings",
		url: "#",
		icon: UserRoundCog,
	},
];

export function AppSidebar() {
	const router = useRouterState();
	const { loading, handleLogout, user } = useAuth();

	return (
		<Sidebar>
			<SidebarContent className="h-full w-full pt-4 pb-2 px-3 flex flex-col space-y-3">
				<img src="/flowva_logo.png" alt="logo" width={150} height={60} />
				<SidebarMenu className="flex-1">
					{items.map((item) => {
						const isActive = item.url === router.location.pathname;
						return (
							<SidebarMenuItem key={item.title}>
								<SidebarMenuButton asChild isActive={isActive}>
									<a
										href={item.url}
										className="p-3 h-12 text-xl flex items-center gap-4 rounded-lg hover:text-primary! hover:bg-primary/50!
										data-[active=true]:text-primary! data-[active=true]:bg-primary/20!
										"
									>
										<div>
											<item.icon className="h-6 w-6" />
										</div>
										<span>{item.title}</span>
									</a>
								</SidebarMenuButton>
							</SidebarMenuItem>
						);
					})}
				</SidebarMenu>

				{/* Profile  */}
				<div className="flex items-center gap-3 rounded-lg px-2 py-3 hover:bg-primary/5 border-t cursor-pointer">
					<div className="h-12 w-12">
						<Avatar className="rounded-full w-full h-full bg-black">
							<AvatarImage
								src="https://github.com/evilrabbit.png"
								alt="@evilrabbit"
								className="w-10 h-10 m-auto"
							/>
							<AvatarFallback>ER</AvatarFallback>
						</Avatar>
					</div>

					<Popover>
						<PopoverTrigger asChild>
							<div className="space-y-1 my-auto">
								<p className="text-md font-medium leading-2">
									{user?.first_name || user?.last_name || "User"}
								</p>
								<p className="text-sm text-muted-foreground">
									{user?.email || "example@gmail.com"}
								</p>
							</div>
						</PopoverTrigger>
						<PopoverContent
							className="p-2 max-w-55"
							side="top"
							align="end"
							sideOffset={25}
							alignOffset={-10}
						>
							<Button
								className="w-full"
								variant="destructive"
								onClick={handleLogout}
							>
								{loading ? <Spinner /> : <LogOut />}
								Logout
							</Button>
						</PopoverContent>
					</Popover>
				</div>
			</SidebarContent>
		</Sidebar>
	);
}
