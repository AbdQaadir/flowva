import { createFileRoute } from "@tanstack/react-router";
import AppHeader from "@/components/AppHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchDailyStreaks } from "@/lib/supabase/fetch-daily-streaks-fn";
import { fetchUserPoints } from "@/lib/supabase/fetch-user-points-fn";
import EarnPoints from "./-features/earn-points/earn-points";
import RedeemRewards from "./-features/redeem-rewards/redeem-rewards";

export const Route = createFileRoute("/_protected/rewards/")({
	loader: async () => {
		const streaksData = await fetchDailyStreaks();
		const pointsData = await fetchUserPoints();
		return {
			streaksData,
			pointsData,
		};
	},
	component: Rewards,
});

const tabs = [
	{
		name: "Earn Points",
		value: "earn-points",
		content: <EarnPoints />,
	},
	{
		name: "Redeem Rewards",
		value: "redeem-rewards",
		content: <RedeemRewards />,
	},
];

function Rewards() {
	return (
		<div className="min-h-screen space-y-8">
			{/* Header */}
			<AppHeader
				title="Rewards Hub"
				description="Earn points, unlock rewards, and celebrate your progress!"
			/>

			<Tabs defaultValue={tabs[0].value} className="gap-4">
				<TabsList className="bg-transparent rounded-none border-none p-0">
					{tabs.map((tab) => (
						<TabsTrigger
							key={tab.value}
							value={tab.value}
							className="p-5 bg-none rounded-none rounded-t-sm data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:border-primary dark:data-[state=active]:border-primary h-full border-0 border-b-3 border-transparent data-[state=active]:shadow-none
							transition-colors duration-400 ease-in-out"
						>
							{tab.name}
						</TabsTrigger>
					))}
				</TabsList>

				{tabs.map((tab) => (
					<TabsContent key={tab.value} value={tab.value}>
						{tab.content}
					</TabsContent>
				))}
			</Tabs>
		</div>
	);
}
