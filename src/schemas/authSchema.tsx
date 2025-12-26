import z from "zod";

export const OnboardingSchema = z.object({
	firstName: z.string().min(1),
	lastName: z.string().min(1),
});

export const FetchProfileSchema = z.object({
	userId: z.string().min(1),
});

export const SignUpSearchSchema = z.object({
	ref: z.string().optional(),
});
