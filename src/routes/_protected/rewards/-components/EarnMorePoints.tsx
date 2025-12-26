import { Share2, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import ShareStackModal from "../-modals/ShareStackModal";

function EarnMorePoints() {
	const { open: isSidebarOpen } = useSidebar();
	return (
		<section>
			<h2 className="mb-6 text-xl text-black font-semibold border-l-4 border-primary pl-3">
				Earn More Points
			</h2>

			<div
				className={cn(
					"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6",
					isSidebarOpen && "grid-cols-1! lg:grid-cols-2!",
				)}
			>
				<Card className="p-0 w-full gap-0 overflow-hidden hover:border-primary hover:-translate-y-1.25 hover:shadow-xl/30 transition-all duration-200 ease-in-out">
					<CardHeader className="w-full flex items-center gap-2 py-4 px-3 bg-white">
						<div className="h-10 w-10 rounded-sm bg-primary/10 flex items-center justify-center">
							<Star className="w-5 h-5 text-primary" />
						</div>
						<p className="text-md font-semibold">
							Refer and win 10,000 points!
						</p>
					</CardHeader>

					<CardContent className="py-5 px-4">
						<div className="flex items-center justify-between">
							<p className="">
								Invite 3 friends by Nov 20 and earn a chance to be one of 5
								winners of <span className="text-primary">10,000 points</span>.
								Friends must complete onboarding to qualify.
							</p>
						</div>
					</CardContent>
				</Card>

				<Card className="p-0 w-full gap-0 overflow-hidden hover:border-primary hover:-translate-y-1.25 hover:shadow-xl/30 transition-all duration-200 ease-in-out">
					<CardHeader className="w-full flex items-center gap-2 py-4 px-3 bg-white">
						<div className="h-10 w-10 rounded-sm bg-primary/10 flex items-center justify-center">
							<Share2 className="w-5 h-5 text-primary" />
						</div>
						<div>
							<p className="text-md font-semibold">Share Your Stack</p>
							<p className="text-xs font-light">Earn +25 pts</p>
						</div>
					</CardHeader>

					<CardContent className="py-5 px-4">
						<div className="flex items-center justify-between">
							<p className="">Share your tool stack</p>

							<ShareStackModal
								trigger={
									<Button variant="secondary" className="rounded-full">
										<Share2 className="w-5 h-5" fontWeight="bold" />
										Share
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

export default EarnMorePoints;
