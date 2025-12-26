import { useNavigate } from "@tanstack/react-router";
import { Bell, Inbox, Mail, MoreHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import type { Notification } from "@/types/notifications";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea } from "../ui/scroll-area";
import { Spinner } from "../ui/spinner";

function NotificationBell() {
	const navigate = useNavigate();
	const {
		isEmpty,
		isDeletingAll,
		isMarkingAll,
		notifications,
		unreadCount,
		markAsRead,
		markAllAsRead,
		deleteAll,
		deleteNotification,
		notificationInDelete,
		notificationInMark,
		isLoading,
	} = useNotifications();

	const [activeNotification, setActiveNotification] =
		useState<Notification | null>(null);

	return (
		<>
			{activeNotification && (
				<Dialog
					open={!!activeNotification}
					onOpenChange={() => setActiveNotification(null)}
				>
					<DialogContent className="max-w-md">
						<DialogHeader className="flex flex-row items-center gap-3">
							<Mail className="w-5 h-5 text-primary" />
							<DialogTitle>{activeNotification?.content.title}</DialogTitle>
						</DialogHeader>

						<div
							className="text-sm text-gray-700 leading-relaxed"
							dangerouslySetInnerHTML={{
								__html: activeNotification?.content.body ?? "",
							}}
						/>

						{activeNotification?.content.link && (
							<Button
								className="mt-4 w-full"
								onClick={() =>
									navigate({ to: activeNotification.content.link })
								}
							>
								View
							</Button>
						)}
					</DialogContent>
				</Dialog>
			)}
			<div className="relative">
				<Popover>
					<PopoverTrigger asChild>
						<Button
							size="icon-lg"
							className="bg-gray-300! rounded-full relative group transition-colors duration-700 ease-in-out"
						>
							<div className="flex items-center gap-4">
								<Bell
									className="w-6 h-6 text-gray-900 group-hover:text-[#9013fe]"
									fill="currentColor"
								/>
								{unreadCount > 0 && (
									<div className="text-[10px] flex items-center justify-center absolute -top-1 right-1 bg-red-700 h-4 w-4 rounded-full">
										{unreadCount}
									</div>
								)}
							</div>
						</Button>
					</PopoverTrigger>
					<PopoverContent
						className="w-100 p-0 overflow-hidden rounded-xl"
						align="end"
						alignOffset={-10}
					>
						{/* Header */}
						<div className="bg-linear-to-r from-[#7C3AED] to-[#DB2777] text-white p-3 ">
							<div className="flex items-center justify-between flex-wrap">
								<h2 className="text-sm font-black">Notifications</h2>
								<div className="flex gap-1 text-sm font-medium">
									<Button
										onClick={markAllAsRead}
										disabled={isEmpty || isMarkingAll || isDeletingAll}
										className="p-2 rounded-none text-white bg-transparent hover:bg-white/10 font-normal"
									>
										{isMarkingAll
											? "Marking all as read..."
											: "Mark all as read"}
									</Button>
									<Button
										onClick={deleteAll}
										disabled={isEmpty || isDeletingAll || isMarkingAll}
										className="p-2 rounded-none text-white bg-transparent hover:bg-white/10 font-normal"
									>
										{isDeletingAll ? "Deleting all..." : "Delete all"}
									</Button>
								</div>
							</div>
						</div>

						<ScrollArea className="h-100">
							{isEmpty ? (
								/* Empty State Placeholder */
								<div className="flex flex-col items-center justify-center h-100 text-slate-400 p-8 text-center">
									<div className="bg-slate-100 p-4 rounded-full mb-4">
										<Inbox className="w-12 h-12 stroke-1" />
									</div>
									<h3 className="text-lg font-semibold text-slate-900">
										No notifications
									</h3>
									<p className="text-sm">
										We'll let you know when something arrives!
									</p>
								</div>
							) : isLoading ? (
								<div className="flex flex-col items-center justify-center h-100 text-slate-400 p-8 text-center">
									<div className="bg-slate-100 p-4 rounded-full mb-4">
										<Spinner className="w-12 h-12 stroke-1" />
									</div>
									<h3 className="text-lg font-semibold text-slate-900">
										Loading...
									</h3>
									<p className="text-sm">
										Please wait while we fetch your notifications.
									</p>
								</div>
							) : (
								<div className="flex flex-col">
									{notifications.map((notification) => {
										const isBeingDeleted =
											notificationInDelete === notification.id;
										return (
											<button
												key={notification.id}
												className={`text-left cursor-pointer relative flex items-start gap-4 p-4 border-b border-slate-100 transition-colors group ${
													!notification.read
														? "bg-primary/10"
														: "bg-transparent"
												}`}
												type="button"
												onClick={() => {
													setActiveNotification(notification);
													if (!notification.read) markAsRead(notification.id);
												}}
											>
												{/* Unread Indicator Line */}
												{!notification.read && (
													<div className="absolute left-0 top-0 bottom-0 w-1 bg-[#7C3AED]" />
												)}

												{/* Icon */}
												<div className="mt-1">
													{notification.content.icon ? (
														<div className="p-2 rounded-full bg-[#E8F5E9]">
															<div className="w-5 h-5 text-[#4CAF50]">
																{notification.content.icon}
															</div>
														</div>
													) : (
														<div className="p-2 rounded-full bg-primary/10">
															<Bell className="w-3 h-3 text-[#7C3AED]" />
														</div>
													)}
												</div>

												{/* Content */}
												<div className="flex-1 space-y-1">
													<div className="flex items-stretch justify-between">
														<div>
															<p
																className={`text-[12px] font-bold text-slate-800`}
															>
																{notification.content.title}
															</p>

															<p
																className="text-sm text-gray-700 line-clamp-1"
																dangerouslySetInnerHTML={{
																	__html: notification.content.body,
																}}
															/>

															<p className="text-xs font-medium text-slate-400 mt-1">
																{notification.created_at.split("T")[0]}
															</p>
														</div>
														<DropdownMenu>
															<DropdownMenuTrigger asChild>
																<Button
																	variant="ghost"
																	size="icon"
																	className="h-8 w-8 text-slate-400"
																>
																	<MoreHorizontal className="h-4 w-4" />
																</Button>
															</DropdownMenuTrigger>
															<DropdownMenuContent align="end">
																<DropdownMenuItem
																	className="text-xs text-destructive hover:text-destructive! cursor-pointer"
																	onClick={(e) => {
																		e.stopPropagation();
																		e.preventDefault();
																		deleteNotification(notification.id);
																	}}
																>
																	<Trash2 className="text-destructive" />
																	{isBeingDeleted ? "Deleting..." : "Remove"}
																</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													</div>
												</div>
											</button>
										);
									})}
								</div>
							)}
						</ScrollArea>
					</PopoverContent>
				</Popover>
			</div>
		</>
	);
}

export default NotificationBell;
