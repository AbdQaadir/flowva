import { useRouter } from "@tanstack/react-router";
import { Award, Calendar, Gift, Star, UserPlus, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useSidebar } from "@/components/ui/sidebar";
import { Spinner } from "@/components/ui/spinner";
import { claimDailyStreak } from "@/lib/supabase/fetch-daily-streaks-fn";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider";
import { Route } from "@/routes/_protected/rewards/";
import ReclaimModal from "../-modals/ReclaimModal";

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
				<Card className="p-0 w-full gap-4 overflow-hidden hover:-translate-y-1.25 hover:shadow-xl/30 transition-all duration-200 ease-in-out">
					<CardHeader className="w-full flex items-center gap-2 py-2.5 px-3 bg-primary/5">
						<Award className="w-5 h-5 text-primary" fill="currentColor" />
						<p className="text-lg font-semibold">Points Balance</p>
					</CardHeader>

					<CardContent className="py-5 px-4">
						<div className="flex items-center justify-between">
							<span className="text-4xl font-bold text-purple-600">
								{totalPoints}
							</span>
							<div className="h-10 w-10 rounded-full bg-yellow-400 flex items-center justify-center">
								<div
									className="h-8 w-8 rounded-full bg-yellow-400 flex items-center justify-center
                                border-2 border-inset-0 border-yellow-500
                                "
								>
									<Star
										className="w-5 h-5 text-yellow-700"
										fill="currentColor"
									/>
								</div>
							</div>
						</div>

						<div className="mt-6">
							<div className="mb-2 flex justify-between text-sm text-gray-500">
								<span>Progress to $5 Gift Card</span>
								<span>{totalPoints} / 5000</span>
							</div>

							<div className="h-2 w-full rounded-full bg-gray-200">
								{/* <div className="h-full w-[2%] rounded-full bg-purple-600" /> */}
								<Progress value={(totalPoints / 5000) * 100} className="" />
							</div>

							<p className="mt-3 text-xs text-gray-500">
								Just getting started — keep earning points!
							</p>
						</div>
					</CardContent>
				</Card>

				<Card className="p-0 w-full gap-4 overflow-hidden hover:-translate-y-1.25 hover:shadow-xl/30 transition-all duration-200 ease-in-out">
					<CardHeader className="w-full flex items-center gap-2 py-2.5 px-3 bg-primary/5">
						<Calendar className="w-5 h-5 text-[#70D6FF]" />
						<p className="text-lg font-semibold">Daily Streak</p>
					</CardHeader>

					<CardContent className="py-5 px-4">
						<div className="flex items-center justify-between">
							<p className="mb-4 text-4xl font-bold text-primary">
								{totalStreaks || 0} day
							</p>
						</div>

						<DailyStreak claimedDates={claimedDates as string[]} />

						<div className="w-full text-center space-y-2">
							<p className="text-xs text-gray-500">
								Check in daily to earn +5 points
							</p>

							<Button
								className="gap-2 w-full rounded-full font-bold"
								disabled={isTodayClaimed || isClaiming}
								onClick={handleClaimPoints}
							>
								{isClaiming ? (
									<Spinner />
								) : (
									<Zap className="w-5 h-5" fontWeight="bold" />
								)}
								{isTodayClaimed ? "Claimed Today" : "Claim Today's Points"}
							</Button>
						</div>
					</CardContent>
				</Card>

				<Card className="p-0 w-full gap-4 overflow-hidden hover:-translate-y-1.25 hover:shadow-xl/30 transition-all duration-200 ease-in-out">
					<CardHeader className="w-full flex items-center justify-between gap-2 p-4 bg-[linear-gradient(135deg,#9013FE_0%,#70D6FF_100%)] text-white">
						<div className="flex flex-col gap-3">
							<Badge className="font-medium">Featured</Badge>
							<h2 className="text-xl font-black">Top Tool Spotlight</h2>

							<p className="text-lg text-white font-bold">Reclaim</p>
						</div>
						<img
							alt="Reclaim"
							src="https://api.flowvahub.com/storage/v1/object/public/icons//reclaim%20(1).png"
							className="w-16 h-16 rounded-full"
						/>
					</CardHeader>

					<CardContent className="pt-2 pb-10 px-4">
						<div className="flex gap-2">
							<div>
								<Calendar className="w-5 h-5 text-primary" />
							</div>

							<div className="flex flex-col gap-1">
								<h4 className="text-md font-semibold leading-5 ">
									Automate and Optimize your Schedule
								</h4>

								<p className="text-sm leading-relaxed opacity-90">
									Reclaim.ai is an AI-powered calendar assistant that
									automatically schedules your tasks, meetings, and breaks to
									boost productivity. Free to try — earn Flowva Points when you
									sign up!
								</p>
							</div>
						</div>
						<div className="mt-6 flex flex-wrap gap-3">
							<a
								href="https://go.reclaim.ai/ur9i6g5eznps"
								rel="noreferrer"
								target="_blank"
							>
								<Button variant="default" className="rounded-full flex-1">
									<UserPlus className="w-5 h-5" fontWeight="bold" />
									Sign up
								</Button>
							</a>
							<ReclaimModal
								userId={user?.id || ""}
								trigger={
									<Button variant="gradient" className="rounded-full flex-1">
										<Gift className="w-5 h-5" fontWeight="bold" />
										Claim 50 pts
									</Button>
								}
							/>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}

interface DailyStreakProps {
	claimedDates: string[]; // array of YYYY-MM-DD strings, e.g., ["2025-12-22", "2025-12-23"]
}

export const DailyStreak = ({ claimedDates }: DailyStreakProps) => {
	const today = new Date().toISOString().split("T")[0];

	// Weekdays starting from Monday
	const days = ["M", "T", "W", "T", "F", "S", "S"];
	const dayOffsets = [1, 2, 3, 4, 5, 6, 0]; // JS getDay() mapping (0=Sunday)

	const currentDate = new Date();

	return (
		<div className="mb-4 flex gap-2">
			{days.map((day, i) => {
				const dayIndex = dayOffsets[i];
				const date = new Date(currentDate);
				// calculate the date corresponding to this weekday
				const diff = dayIndex - currentDate.getDay();
				date.setDate(currentDate.getDate() + diff);
				const dateStr = date.toISOString().split("T")[0];

				const isClaimed = claimedDates.includes(dateStr);
				const isToday = dateStr === today;

				const baseClasses =
					"flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors";

				const claimedClasses = "bg-purple-600 text-white";
				const todayClasses = "border-2 border-purple-600 font-semibold";
				const defaultClasses = "bg-gray-100 text-gray-400";

				const classes = isClaimed
					? claimedClasses
					: isToday
						? `${defaultClasses} ${todayClasses}`
						: defaultClasses;

				return (
					<div key={`${day}-${i + 2}`} className={`${baseClasses} ${classes}`}>
						{day}
					</div>
				);
			})}
		</div>
	);
};

export default RewardsJourney;
