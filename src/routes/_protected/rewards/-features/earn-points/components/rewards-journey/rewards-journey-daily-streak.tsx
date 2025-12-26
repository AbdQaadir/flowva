import { Calendar, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

type Props = {
	claimedDates: string[]; // array of YYYY-MM-DD strings, e.g., ["2025-12-22", "2025-12-23"]
	totalStreaks: number;
	isTodayClaimed: boolean;
	isClaiming: boolean;
	handleClaimPoints: () => void;
};
function RewardsJourneyDailyStreak({
	claimedDates,
	totalStreaks,
	isTodayClaimed,
	isClaiming,
	handleClaimPoints,
}: Props) {
	const today = new Date().toISOString().split("T")[0];

	// Weekdays starting from Monday
	const days = ["M", "T", "W", "T", "F", "S", "S"];
	const dayOffsets = [1, 2, 3, 4, 5, 6, 0]; // JS getDay() mapping (0=Sunday)

	const currentDate = new Date();
	return (
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
							<div
								key={`${day}-${i + 2}`}
								className={`${baseClasses} ${classes}`}
							>
								{day}
							</div>
						);
					})}
				</div>

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
	);
}

export default RewardsJourneyDailyStreak;
