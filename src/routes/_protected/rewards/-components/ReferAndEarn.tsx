import { Link } from "@tanstack/react-router";
import { Check, Copy, Users } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Route } from "..";

function ReferAndEarn() {
	const [copied, setCopied] = React.useState(false);
	const { pointsData } = Route.useLoaderData();

	const referralCode = pointsData?.referral_code;
	const referralLink = referralCode
		? `${import.meta.env.VITE_APP_URL}/sign-up?ref=${referralCode}`
		: "";

	const referralPoints = pointsData?.referral_points || 0;
	const referralCount = pointsData?.referral_count || 0;

	const handleCopy = (text: string) => {
		try {
			navigator.clipboard.writeText(text);
			toast.success("Copied!");
			setCopied(true);
			setTimeout(() => {
				setCopied(false);
			}, 2000);
		} catch (error) {
			console.error("Failed to copy text: ", error);
		}
	};

	return (
		<section>
			<h2 className="mb-6 text-xl text-black font-semibold border-l-4 border-primary pl-3">
				Refer & Earn
			</h2>

			<div className="grid grid-cols-1 gap-6">
				<Card className="p-0 w-full gap-0 overflow-hidden hover:-translate-y-1.25 hover:shadow-md transition-all duration-200 ease-in-out">
					<CardHeader className="w-full flex items-center gap-2 py-4 px-3 bg-primary/5">
						<div className="h-10 w-10 rounded-sm bg-primary/10 flex items-center justify-center">
							<Users className="w-5 h-5 text-primary" />
						</div>
						<div>
							<h2 className="text-xl font-semibold">Share Your Link</h2>
							<p>Inivte friends and earn 25 points when they join!</p>
						</div>
					</CardHeader>

					<CardContent className="py-5 px-4 space-y-6">
						<div className="grid grid-cols-2 justify-between gap-6">
							<div className="text-center space-y-1">
								<h4 className="text-2xl text-primary font-bold">
									{referralCount}
								</h4>
								<p>Referrals</p>
							</div>

							<div className="text-center space-y-1">
								<h4 className="text-2xl text-primary font-bold">
									{referralPoints}
								</h4>
								<p>Points Earned</p>
							</div>
						</div>

						{referralLink && (
							<div className="bg-primary/5 p-3 space-y-2">
								<p>Your personal referral link:</p>

								{/* Copyable link */}
								<div className="flex items-center gap-2">
									<div className="w-full relative">
										<input
											type="text"
											readOnly
											className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full pr-10"
											value={referralLink}
										/>
										<Button
											className="transition absolute top-[50%] -translate-y-[50%] right-2"
											size="icon-sm"
											variant="ghost"
											onClick={() => handleCopy(referralLink)}
										>
											{copied ? <Check /> : <Copy />}
										</Button>
									</div>
								</div>
							</div>
						)}

						{/* Social links */}

						<div className="w-full flex items-center justify-center gap-2">
							<Link
								to="/rewards"
								className="w-7.5 h-7.5 rounded-full flex items-center justify-center text-white text-[18px] transition-transform duration-200 hover:-translate-y-0.75 bg-[#1877f2]"
							>
								<svg
									aria-hidden="true"
									focusable="false"
									data-prefix="fab"
									data-icon="facebook-f"
									className="svg-inline--fa fa-facebook-f "
									role="img"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 320 512"
									height="18px"
									width="18px"
								>
									<path
										fill="currentColor"
										d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"
									></path>
								</svg>
							</Link>
							<Link
								to="/rewards"
								className="w-7.5 h-7.5 rounded-full flex items-center justify-center text-white text-[18px] transition-transform duration-200 hover:-translate-y-0.75 bg-black"
							>
								<svg
									aria-hidden="true"
									focusable="false"
									data-prefix="fab"
									data-icon="x-twitter"
									className="svg-inline--fa fa-x-twitter "
									role="img"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 512 512"
									height="18px"
									width="18px"
								>
									<path
										fill="currentColor"
										d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
									></path>
								</svg>
							</Link>
							<Link
								to="/rewards"
								className="w-7.5 h-7.5 rounded-full flex items-center justify-center text-white text-[18px] transition-transform duration-200 hover:-translate-y-0.75 bg-[#0077b5]"
							>
								<svg
									aria-hidden="true"
									focusable="false"
									data-prefix="fab"
									data-icon="linkedin-in"
									className="svg-inline--fa fa-linkedin-in "
									role="img"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 448 512"
									height="18px"
									width="18px"
								>
									<path
										fill="currentColor"
										d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
									></path>
								</svg>
							</Link>

							<Link
								to="/rewards"
								className="w-7.5 h-7.5 rounded-full flex items-center justify-center text-white text-[18px] transition-transform duration-200 hover:-translate-y-0.75 bg-[#25d366]"
							>
								<svg
									aria-hidden="true"
									focusable="false"
									data-prefix="fab"
									data-icon="whatsapp"
									className="svg-inline--fa fa-whatsapp"
									role="img"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 448 512"
									height="18px"
									width="18px"
								>
									<path
										fill="currentColor"
										d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
									></path>
								</svg>
							</Link>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}

export default ReferAndEarn;
