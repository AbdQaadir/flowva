import { zodResolver } from "@hookform/resolvers/zod";
import { DownloadCloud } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RewardKeys } from "@/constants";
import supabase from "@/lib/supabase";
import { submitRewardClaim } from "@/lib/supabase/submit-reward-claim-fn";
import type { ClaimRewardFormValues } from "@/schemas/rewardsSchema";
import { claimRewardSchema } from "@/schemas/rewardsSchema";

type Props = {
	trigger: React.ReactNode;
	userId: string;
};
function ReclaimModal({ trigger, userId }: Props) {
	const [open, setOpen] = useState(false);

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		reset,
		formState: { errors, isSubmitting, isValid },
	} = useForm<ClaimRewardFormValues>({
		resolver: zodResolver(claimRewardSchema),
		reValidateMode: "onChange",
	});

	const uploadRewardScreenshot = async (file: File, rewardKey: string) => {
		const path = `${userId}/${rewardKey}/${Date.now()}.png`;

		const { error } = await supabase.storage
			.from("reward-claims")
			.upload(path, file);

		if (error) throw error;

		const { data } = supabase.storage.from("reward-claims").getPublicUrl(path);

		return data.publicUrl;
	};

	const onSubmit = async (values: ClaimRewardFormValues) => {
		try {
			// Upload file FIRST
			const screenshotUrl = await uploadRewardScreenshot(
				values.screenshot,
				RewardKeys.RECLAIM_SIGNUP,
			);

			await submitRewardClaim({
				data: {
					rewardKey: RewardKeys.RECLAIM_SIGNUP,
					rewardPoints: 50,
					email: values.email,
					screenshotUrl,
				},
			});

			onClose();
			toast.success("Your claim was submitted successfully!");
		} catch (error: any) {
			console.error(error);
			toast.error(error.message || "Something went wrong");
		}
	};

	const onClose = () => {
		reset({
			email: "",
			screenshot: undefined,
		});
		setOpen(false);
	};

	return (
		<Dialog
			open={open}
			onOpenChange={(value) => setOpen(value)}
			key={`${open}-${userId}`}
		>
			<DialogTrigger asChild>{trigger}</DialogTrigger>

			<DialogContent className="max-w-[90vw] md:max-w-120 justify-center gap-4">
				<DialogHeader>
					<DialogTitle className="font-black text-xl">
						Claim Your 25 Points
					</DialogTitle>
				</DialogHeader>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<p>
						Sign up for Reclaim (free, no payment needed), then fill the form
						below: <br />
						1️⃣ Enter your Reclaim sign-up email. <br />
						2️⃣ Upload a screenshot of your Reclaim profile showing your email.
						After verification, you'll get 25 Flowva Points! 🎉😊
					</p>

					<div>
						<Label className="mb-1 block text-sm font-medium">
							Email used on Reclaim
						</Label>
						<Input
							type="email"
							placeholder="user@example.com"
							{...register("email")}
							className="w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500"
							error={!!errors.email}
							errorText={errors.email?.message}
						/>
					</div>
					<div>
						<Label className="mb-1 block text-sm font-medium">
							Upload screenshot (mandatory)
						</Label>

						<div className="space-y-1">
							<Label className="flex-1 relative flex cursor-pointer items-center justify-center rounded-md border border-dashed py-6 text-sm text-gray-500 bg-gray-100 hover:bg-gray-300 transition-colors duration-300 ease-in-out">
								<Input
									type="file"
									accept="image/*"
									className="hidden"
									onChange={(e) =>
										setValue("screenshot", e.target.files?.[0] as File, {
											shouldValidate: true,
										})
									}
									error={!!errors.screenshot}
									errorText={errors.screenshot?.message}
								/>

								<div className="flex w-full items-center justify-center absolute top-[50%] -translate-y-1/2 text-center text-sm text-gray-600 gap-2">
									<DownloadCloud />

									{watch("screenshot") ? "Change File" : "Choose File"}
								</div>
							</Label>
							{watch("screenshot") && (
								<p className="text-xs text-gray-700 font-medium text-center">
									Selected file: {watch("screenshot")?.name}
								</p>
							)}
						</div>

						<DialogFooter className="flex justify-end gap-3 pt-4">
							<Button
								type="button"
								onClick={onClose}
								variant="secondary"
								disabled={isSubmitting}
							>
								Cancel
							</Button>

							<Button type="submit" disabled={isSubmitting || !isValid}>
								{isSubmitting ? "Submitting..." : "Submit Claim"}
							</Button>
						</DialogFooter>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}

export default ReclaimModal;
