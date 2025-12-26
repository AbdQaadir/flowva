import { createFileRoute } from "@tanstack/react-router";

import { SignUpForm } from "@/components/auth/sign-up-form";
import { SignUpSearchSchema } from "@/schemas/authSchema";

export const Route = createFileRoute("/sign-up")({
	component: SignUp,
	validateSearch: SignUpSearchSchema,
});

function SignUp() {
	const { ref } = Route.useSearch();

	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<SignUpForm referralCode={ref} />
			</div>
		</div>
	);
}
