import { createServerFn } from "@tanstack/react-start";
import { OnboardingSchema } from "@/schemas/authSchema";
import { createClient } from "./server";

export const completeOnboarding = createServerFn({
	method: "POST",
})
	.inputValidator(OnboardingSchema)
	.handler(async ({ data }) => {
		const supabase = createClient();

		const {
			data: { user },
		} = await supabase.auth.getUser();

		if (!user) {
			throw new Error("Not authenticated");
		}

		const { error } = await supabase
			.from("profiles")
			.update({
				first_name: data.firstName,
				last_name: data.lastName,
				onboarding_completed: true,
			})
			.eq("id", user.id);

		if (error) {
			return { success: false };
		}

		return { success: true };
	});
