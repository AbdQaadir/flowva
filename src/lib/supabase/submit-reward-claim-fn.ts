import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { createClient } from "@/lib/supabase/server";
import { fetchUser } from "./fetch-user-server-fn";

const SubmitRewardClaimSchema = z.object({
	rewardKey: z.string(),
	rewardPoints: z.number(),
	email: z.string().email(),
	screenshotUrl: z.string().url(),
});
export const submitRewardClaim = createServerFn({
	method: "POST",
})
	.inputValidator(SubmitRewardClaimSchema)
	.handler(async ({ data }) => {
		const supabase = createClient();

		const user = await fetchUser();

		if (!user) throw new Error("Not authenticated");
		const userId = user?.id || "";

		const { rewardKey, rewardPoints, email, screenshotUrl } = data;

		// 1. Prevent duplicate claims
		const { data: existing } = await supabase
			.from("reward_claims")
			.select("id")
			.eq("user_id", userId)
			.eq("reward_key", rewardKey)
			.neq("status", "rejected")
			.single();

		if (existing) {
			throw new Error("You’ve already submitted this claim");
		}

		// 2. Create claim record
		const { error: insertError } = await supabase.from("reward_claims").insert({
			user_id: userId,
			reward_key: rewardKey,
			reward_points: rewardPoints,
			email,
			screenshot_url: screenshotUrl,
		});

		if (insertError) throw insertError;

		// 🔔 Create notification
		await supabase.from("notifications").insert({
			user_id: userId,
			type: "reward_request",
			content: {
				title: "Reward Claim Submitted 🎁",
				body: `Your claim for <strong>${data.rewardPoints}</strong> Flowva points has been submitted. Once verified, the points will be added to your account. 🎉`,
				icon: "",
				link: "/rewards",
				metadata: {
					points: data.rewardPoints,
				},
			},
		});

		return { success: true };
	});
