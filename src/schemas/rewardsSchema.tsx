import { z } from "zod";

export const claimRewardSchema = z.object({
	email: z.email("Enter a valid email"),
	screenshot: z
		.instanceof(File, { message: "Screenshot is required" })
		.refine((file) => file.size > 0, "Screenshot is required"),
});

export type ClaimRewardFormValues = z.infer<typeof claimRewardSchema>;
