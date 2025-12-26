import { createServerFn } from "@tanstack/react-start";
import { fetchUser } from "./fetch-user-server-fn";
import { createClient } from "./server";

export const fetchDailyStreaks = createServerFn({
	method: "GET",
}).handler(async () => {
	const supabase = createClient();

	const user = await fetchUser();
	const userId = user?.id || "";

	if (!userId) return { last7Days: [], totalStreaks: 0, isTodayClaimed: false };

	const sevenDaysAgo = new Date();
	sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
	const fromDate = sevenDaysAgo.toISOString().split("T")[0]; // "YYYY-MM-DD"

	const { data: last7Days, error: last7Error } = await supabase
		.from("daily_streaks")
		.select("date")
		.eq("user_id", userId)
		.gte("date", fromDate)
		.order("date", { ascending: true });

	if (last7Error) throw last7Error;

	// 2. Total cumulative points
	const { count: totalStreaks, error: totalError } = await supabase
		.from("daily_streaks")
		.select("id", { count: "exact", head: true })
		.eq("user_id", userId);

	if (totalError) throw totalError;

	const claimedDates = last7Days.map((streak) => streak.date as string) || [];
	const today = new Date().toISOString().split("T")[0];
	const isTodayClaimed = claimedDates.includes(today);

	return {
		last7Days: last7Days || [],
		totalStreaks,
		isTodayClaimed,
		claimedDates,
	};
});

export const claimDailyStreak = createServerFn({
	method: "POST",
}).handler(async () => {
	const supabase = createClient();

	const user = await fetchUser();
	const userId = user?.id || "";

	if (!userId) return { claimed: false };

	const today = new Date().toISOString().split("T")[0];

	// Check if already claimed today
	const { data: existing, error: checkError } = await supabase
		.from("daily_streaks")
		.select("*")
		.eq("user_id", userId)
		.eq("date", today)
		.single();

	if (checkError && checkError.code !== "PGRST116") throw checkError; // ignore "not found"
	if (existing) throw new Error("Already claimed today");

	// // Insert new claim
	// const { data: inserted, error: insertError } = await supabase
	// 	.from("daily_streaks")
	// 	.insert([{ user_id: userId, date: today, claimed: true }])
	// 	.select();

	// if (insertError) throw insertError;

	const { error } = await supabase.rpc("claim_daily_streak", {
		p_user_id: userId,
	});

	if (error) throw error;

	return { claimed: true, date: today };
});
