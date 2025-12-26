import { Calendar, Gift, UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import ReclaimModal from "../../../../-modals/reclaim-modal";

type Props = {
	userId: string;
};
function RewardsJourneySpotlight({ userId }: Props) {
	return (
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
							Reclaim.ai is an AI-powered calendar assistant that automatically
							schedules your tasks, meetings, and breaks to boost productivity.
							Free to try — earn Flowva Points when you sign up!
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
						userId={userId || ""}
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
	);
}

export default RewardsJourneySpotlight;
