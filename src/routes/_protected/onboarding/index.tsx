import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTitle } from "@radix-ui/react-dialog";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner"; // or 'zod/v4'
import type { z } from "zod";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { completeOnboarding } from "@/lib/supabase/complete-onboarding-server-fn";
import { OnboardingSchema } from "@/schemas/authSchema";

type FormValues = z.infer<typeof OnboardingSchema>;

export const Route = createFileRoute("/_protected/onboarding/")({
	component: OnboardingPage,
});

function OnboardingPage() {
	const navigate = useNavigate();

	const {
		watch,
		setValue,
		trigger,
		handleSubmit,
		formState: { isSubmitting, errors, isValid },
	} = useForm<FormValues>({
		defaultValues: {
			firstName: "",
			lastName: "",
		},
		resolver: zodResolver(OnboardingSchema),
		reValidateMode: "onChange",
	});
	async function onSubmit(data: FormValues) {
		const { firstName, lastName } = data;
		try {
			await trigger();

			await completeOnboarding({
				data: {
					firstName,
					lastName,
				},
			});

			navigate({
				to: "/rewards",
				replace: true,
			});
		} catch (error: any) {
			toast.error(error.message);
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.name as keyof FormValues, e.target.value, {
			shouldDirty: true,
			shouldValidate: true,
		});
	};

	return (
		<div className="flex flex-col gap-6">
			<AppHeader
				title="Onboarding Flow"
				description="Tell us a bit about yourself to get started."
			/>

			<Dialog open={true} onOpenChange={() => {}}>
				<DialogContent className="max-w-[90vw] md:max-w-[825px]">
					<DialogHeader>
						<DialogTitle className="font-bold">Complete Onboarding</DialogTitle>
						<DialogDescription className="text-gray-700">
							Tell us a bit about yourself to get started.
						</DialogDescription>
					</DialogHeader>

					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<Input
							required
							name="firstName"
							id="firstName"
							label="First name"
							placeholder="John"
							value={watch("firstName")}
							onChange={handleChange}
							error={!!errors?.firstName}
							errorText={errors?.firstName?.message}
						/>

						<Input
							required
							name="lastName"
							id="lastName"
							label="Last name"
							placeholder="Doe"
							value={watch("lastName")}
							onChange={handleChange}
							error={!!errors?.lastName}
							errorText={errors?.lastName?.message}
						/>

						<div className="pt-2">
							<Button
								type="submit"
								disabled={isSubmitting || !isValid}
								className="w-full rounded-full"
							>
								{isSubmitting ? <Spinner /> : <Save />}
								Continue to application
							</Button>
						</div>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
}
