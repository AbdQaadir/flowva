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
	component: ProtectedLayout,
});

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
