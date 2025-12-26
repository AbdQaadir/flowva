"use client";

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-provider";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	const navigate = useNavigate();

	const { user, loading } = useAuth();

	if (loading) {
		return (
			<div className="flex min-h-screen w-full items-center justify-center bg-gray-50">
				<p className="text-gray-400 text-lg">Loading...</p>
			</div>
		);
	}

	const handleCTA = () => {
		if (user) {
			navigate({ to: "/rewards" }); // redirect logged-in users
		} else {
			navigate({ to: "/login" }); // redirect guests to login
		}
	};

	return (
		<div className="flex min-h-screen w-full flex-col items-center justify-center bg-linear-to-b from-indigo-100 to-indigo-50 px-6">
			<h1 className="text-4xl font-bold text-primary/90 mb-4 text-center">
				Welcome to Flowvahub
			</h1>
			<p className="text-lg text-primary/70 mb-8 text-center max-w-md">
				Your workspace is ready.{" "}
				{user ? "Continue to your dashboard." : "Please log in to get started."}
			</p>
			<Button onClick={handleCTA} className="px-8 py-3 text-lg">
				{user ? "Go to Dashboard" : "Login"}
			</Button>
		</div>
	);
}
