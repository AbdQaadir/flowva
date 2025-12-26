import React, { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSidebar } from "@/components/ui/sidebar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { REWARD_STATUS_ENUM, REWARDS_CATALOG } from "@/constants/rewards";
import { cn } from "@/lib/utils";

const tabs = [
	{
		name: "All Rewards",
		value: "all-rewards",
	},
	{
		name: "Unlocked",
		value: "unlocked",
	},
	{
		name: "Locked",
		value: "locked",
	},
	{
		name: "Coming Soon",
		value: "coming-soon",
	},
];

function RedeemRewards() {
	const { open: isSidebarOpen } = useSidebar();

	const [selectedTab, setSelectedTab] = React.useState(tabs[0].value);

	const handleTabChange = (value: string) => {
		setSelectedTab(value);
	};

	const filteredPoints = useMemo(() => {
		if (!selectedTab || selectedTab === "all-rewards") return REWARDS_CATALOG;

		return REWARDS_CATALOG.filter((point) => point.status === selectedTab);
	}, [selectedTab]);

	const pointsCountByStatus = useMemo(() => {
		const pointsCountByStatus: Record<string, number> = {
			"all-rewards": REWARDS_CATALOG.length,
			locked: 0,
			unlocked: 0,
			"coming-soon": 0,
		};

		REWARDS_CATALOG.forEach((point) => {
			pointsCountByStatus[point.status] += 1;
		});

		return pointsCountByStatus;
	}, []);

	return (
		<section className="w-full flex flex-col gap-6">
			<div>
				<h2 className="mb-6 text-xl text-black font-semibold border-l-4 border-primary pl-3">
					Redeem Your Points
				</h2>

				<Tabs
					defaultValue={selectedTab}
					value={selectedTab}
					onValueChange={(value) => handleTabChange(value)}
					className="gap-12"
				>
					<TabsList className="bg-transparent rounded-none border-none p-0">
						{tabs.map((tab) => {
							const isActive = tab.value === selectedTab;
							const count = pointsCountByStatus[tab.value];
							return (
								<TabsTrigger
									key={tab.value}
									value={tab.value}
									className="p-5 bg-none rounded-none rounded-t-sm data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:border-primary dark:data-[state=active]:border-primary h-full border-0 border-b-3 border-transparent data-[state=active]:shadow-none
							transition-colors duration-400 ease-in-out"
								>
									{tab.name}

									<span
										className={cn(
											"text-xs bg-gray-200 text-muted-foreground min-h-6 min-w-6 aspect-square flex items-center justify-center rounded-full p-0.5",

											isActive && "text-primary bg-primary/10",
										)}
									>
										{count}
									</span>
								</TabsTrigger>
							);
						})}
					</TabsList>

					<div
						className={cn(
							"grid grid-cols-1 md:grid-cols-3  gap-6",
							isSidebarOpen && "grid-cols-1! md:grid-cols-1! lg:grid-cols-3!",
						)}
					>
						{filteredPoints?.map((point) => {
							const isLocked = point.status === REWARD_STATUS_ENUM.locked;
							const isComingSoon =
								point.status === REWARD_STATUS_ENUM.comingSoon;
							const isDisabled = isLocked || isComingSoon;

							return (
								<Card
									key={point.title}
									className={cn(
										"p-0 w-full gap-4 overflow-hidden border-primary/10 hover:-translate-y-0.75 hover:shadow-xl/10 transition-all duration-400 ease-in-out",
										isDisabled && "cursor-not-allowed opacity-90",
									)}
								>
									<CardContent className="text-center p-5 flex flex-col items-center justify-center gap-3">
										<div className="w-12 h-12 rounded-2xl flex items-center justify-center m-[0_auto_1rem] text-[1.5rem] text-primary bg-primary/5">
											{point.icon}
										</div>

										<h4 className="text-lg font-bold">{point.title}</h4>

										<p className="text-sm text-gray-600">{point.description}</p>

										<p className="mb-2 flex items-center justify-between gap-1 ">
											⭐
											<span className="text-primary font-semibold">
												{point.points} pts
											</span>
										</p>

										<Button
											className="w-full rounded-sm font-bold"
											variant={isDisabled ? "secondary" : "default"}
											disabled={isDisabled}
										>
											{isComingSoon
												? "Coming Soon"
												: isLocked
													? "Locked"
													: "Redeem"}
										</Button>
									</CardContent>
								</Card>
							);
						})}
					</div>
				</Tabs>
			</div>
		</section>
	);
}

export default RedeemRewards;
