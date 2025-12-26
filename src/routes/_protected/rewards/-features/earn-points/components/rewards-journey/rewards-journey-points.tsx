import { Award, Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type Props = {
	totalPoints: number;
};
function RewardsJourneyPoints({ totalPoints }: Props) {
	return (
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
							<Star className="w-5 h-5 text-yellow-700" fill="currentColor" />
						</div>
					</div>
				</div>

				<div className="mt-6">
					<div className="mb-2 flex justify-between text-sm text-gray-500">
						<span>Progress to $5 Gift Card</span>
						<span>{totalPoints} / 5000</span>
					</div>

					<div className="h-2 w-full rounded-full bg-gray-200">
						<Progress value={(totalPoints / 5000) * 100} className="" />
					</div>

					<p className="mt-3 text-xs text-gray-500">
						Just getting started — keep earning points!
					</p>
				</div>
			</CardContent>
		</Card>
	);
}

export default RewardsJourneyPoints;
