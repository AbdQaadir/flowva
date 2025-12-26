import { createServerFn } from "@tanstack/react-start";
import type { ExtendedUser } from "@/types/user";
import { fetchUser } from "./fetch-user-server-fn";
import { createClient } from "./server";

type UserPoints = Pick<
	ExtendedUser,
	| "points"
	| "referral_code"
	| "referred_by"
	| "referral_points"
	| "referral_count"
>;
export const fetchUserPoints = createServerFn({
	method: "GET",
}).handler(async () => {
	const supabase = createClient();

	const user = await fetchUser();
	const userId = user?.id || "";

	const { data, error } = await supabase
		.from("profiles")
		.select(
			"points, referral_code, referred_by, referral_points, referral_count",
		)
		.eq("id", userId)
		.single();

	if (error) {
		console.error(error);
		return null;
	}

	return data as UserPoints;
});
