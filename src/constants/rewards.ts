export enum REWARD_STATUS_ENUM {
	locked = "locked",
	unlocked = "unlocked",
	comingSoon = "coming-soon",
}
export const REWARDS_CATALOG = [
	{
		icon: "💸",
		title: "$5 Bank Transfer",
		description: "The $5 equivalent will be transferred to your bank account.",
		points: 5000,
		status: REWARD_STATUS_ENUM.locked,
	},
	{
		icon: "💸",
		title: "$5 PayPal International",
		description:
			"Receive a $5 PayPal balance transfer directly to your PayPal account email.",
		points: 5000,
		status: REWARD_STATUS_ENUM.locked,
	},
	{
		icon: "🎁",
		title: "$5 Virtual Visa Card",
		description:
			"Use your $5 prepaid card to shop anywhere Visa is accepted online.",
		points: 5000,
		status: REWARD_STATUS_ENUM.locked,
	},
	{
		icon: "🎁",
		title: "$5 Apple Gift Card",
		description:
			"Redeem this $5 Apple Gift Card for apps, games, music, movies, and more on the App Store and iTunes.",
		points: 5000,
		status: REWARD_STATUS_ENUM.locked,
	},
	{
		icon: "🎁",
		title: "$5 Google Play Card",
		description:
			"Use this $5 Google Play Gift Card to purchase apps, games, movies, books, and more on the Google Play Store.",
		points: 5000,
		status: REWARD_STATUS_ENUM.locked,
	},
	{
		icon: "🎁",
		title: "$5 Amazon Gift Card",
		description:
			"Get a $5 digital gift card to spend on your favorite tools or platforms.",
		points: 5000,
		status: REWARD_STATUS_ENUM.locked,
	},
	{
		icon: "🎁",
		title: "$10 Amazon Gift Card",
		description:
			"Get a $10 digital gift card to spend on your favorite tools or platforms.",
		points: 10000,
		status: REWARD_STATUS_ENUM.locked,
	},
	{
		icon: "📚",
		title: "Free Udemy Course",
		description: "Coming Soon!",
		points: 0,
		status: REWARD_STATUS_ENUM.comingSoon,
	},
];
