import type { Factor, User } from "@supabase/supabase-js";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { createClient } from "./server";

type SSRSafeUser = User & {
	factors: (Factor & { factor_type: "phone" | "totp" })[];
};

export const fetchUser: () => Promise<SSRSafeUser | null> = createServerFn({
	method: "GET",
}).handler(async () => {
	const supabase = createClient();
	const { data, error } = await supabase.auth.getUser();

	if (error) {
		return null;
	}

	return data.user as SSRSafeUser;
});

type Profile = {
	id: string;
	onboarding_completed: boolean;
};

const FetchProfileSchema = z.object({
	userId: z.string().min(1),
});
export const fetchProfile = createServerFn({
	method: "GET",
})
	.inputValidator(FetchProfileSchema)
	.handler(async ({ data }) => {
		const supabase = createClient();

		const { data: response, error } = await supabase
			.from("profiles")
			.select("*")
			.eq("id", data.userId)
			.single();

		if (error) {
			return null;
		}

		return response as Profile;
	});
