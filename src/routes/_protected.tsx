import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { fetchProfile, fetchUser } from "@/lib/supabase/fetch-user-server-fn";

export const Route = createFileRoute("/_protected")({
	beforeLoad: async (routeData) => {
		const user = await fetchUser();

		if (!user) {
			throw redirect({ to: "/login" });
		}

		const profile = await fetchProfile({
			data: {
				userId: user?.id || "",
			},
		});
		const completedOnboarding = !!profile?.onboarding_completed;
		const isOnboardingRoute = routeData.location.pathname === "/onboarding";
		if (!completedOnboarding && !isOnboardingRoute) {
			throw redirect({ to: "/onboarding" });
		}

		return {
			user,
		};
	},
	pendingComponent: ProtectedLoader,
	component: ProtectedLayout,
});

function ProtectedLoader() {
	return (
		<div className="fixed top-0 left-o z-50 w-full h-full inset-0 flex items-center justify-center bg-gray-100">
			<div className="flex flex-col items-center gap-4">
				<img
					src="/flowva_logo.png"
					alt="logo"
					width={250}
					height={120}
					className="animate-pulse"
				/>
			</div>
		</div>
	);
}
function ProtectedLayout() {
	return (
		<SidebarProvider>
			<main className="w-full flex-1 flex">
				<AppSidebar />
				<div className="flex-1 flex flex-col p-4 md:p-8">
					<Outlet />
				</div>
			</main>
		</SidebarProvider>
	);
}
