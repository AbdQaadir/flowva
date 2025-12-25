import { createFileRoute } from "@tanstack/react-router";
import AppHeader from "@/components/AppHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import supabase from "@/lib/supabase";
import EarnPoints from "./-features/EarnPoints/EarnPoints";
import RedeemRewards from "./-features/RedeemRewards/RedeemRewards";

export const Route = createFileRoute("/_protected/rewards/")({
	loader: async () => {
		const { data: instruments } = await supabase.from("instruments").select();
		return { instruments };
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
	const { instruments } = Route.useLoaderData();

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
						<p className="text-muted-foreground text-sm">{tab.content}</p>
					</TabsContent>
				))}
			</Tabs>
		</div>
	);
}
