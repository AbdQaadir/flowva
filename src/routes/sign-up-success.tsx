"use client";

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/sign-up-success")({
	component: SignUpSuccess,
});

function SignUpSuccess() {
	const navigate = useNavigate();

	const handleLoginRedirect = () => {
		navigate({ to: "/login" }); // adjust path to your login route
	};

	return (
		<div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<div className="flex flex-col gap-6">
					<Card>
						<CardHeader>
							<CardTitle className="text-2xl">
								Thank you for signing up!
							</CardTitle>
							<CardDescription>
								Your account has been successfully created.
							</CardDescription>
						</CardHeader>
						<CardContent className="flex flex-col gap-4">
							<p className="text-sm text-muted-foreground">
								You can now log in and start using the app.
							</p>
							<Button onClick={handleLoginRedirect} className="w-full">
								Go to Login
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
