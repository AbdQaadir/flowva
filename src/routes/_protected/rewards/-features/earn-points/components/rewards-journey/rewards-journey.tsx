import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { useSidebar } from "@/components/ui/sidebar";
import { claimDailyStreak } from "@/lib/supabase/fetch-daily-streaks-fn";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/auth-provider";
import { Route } from "@/routes/_protected/rewards/";

import RewardsJourneyDailyStreak from "./rewards-journey-daily-streak";
import RewardsJourneyPoints from "./rewards-journey-points";
import RewardsJourneySpotlight from "./rewards-journey-spotlight";

function RewardsJourney() {
	const router = useRouter();
	const { user } = useAuth();
	const { open: isSidebarOpen } = useSidebar();

	const { streaksData, pointsData } = Route.useLoaderData();
	const totalPoints = pointsData?.points || 0;
	const { claimedDates, totalStreaks, isTodayClaimed } = streaksData;

	const [isClaiming, setIsClaiming] = useState(false);

	const handleClaimPoints = async () => {
		setIsClaiming(true);
		try {
			await claimDailyStreak();
			router.invalidate();
			toast.success("You have claimed today's points!");
		} catch (error) {
			console.error(error);
			toast.error("Something went wrong");
		} finally {
			setIsClaiming(false);
		}
	};

	return (
		<section>
			<h2 className="mb-6 text-xl text-black font-semibold border-l-4 border-primary pl-3">
				Your Rewards Journey
			</h2>

			<div
				className={cn(
					"grid grid-cols-1 md:grid-cols-3  gap-6",
					isSidebarOpen && "grid-cols-1! md:grid-cols-1! lg:grid-cols-3!",
				)}
			>
				<RewardsJourneyPoints totalPoints={totalPoints} />

				<RewardsJourneyDailyStreak
					claimedDates={claimedDates as string[]}
					totalStreaks={totalStreaks || 0}
					isTodayClaimed={isTodayClaimed}
					isClaiming={isClaiming}
					handleClaimPoints={handleClaimPoints}
				/>

				<RewardsJourneySpotlight userId={user?.id || ""} />
			</div>
		</section>
	);
}

export default RewardsJourney;
