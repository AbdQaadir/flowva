import { useEffect, useState } from "react";
import { toast } from "sonner";
import supabase from "@/lib/supabase";
import { useAuth } from "@/providers/auth-provider";
import type { Notification } from "@/types/notifications";

export function useNotifications() {
	const { user } = useAuth();
	const userId = user?.id || "";

	const [isLoading, setIsLoading] = useState(true);
	const [isMarkingAll, setIsMarkingAll] = useState(false);
	const [isDeletingAll, setIsDeletingAll] = useState(false);
	const [notificationInDelete, setNotificationInDelete] = useState<any>(null);
	const [notificationInMark, setNotificationInMark] = useState<any>(null);
	const [notifications, setNotifications] = useState<Notification[]>([]);
	const [unreadCount, setUnreadCount] = useState(0);

	useEffect(() => {
		const fetchNotifications = async () => {
			try {
				setIsLoading(true);
				if (!userId) return;

				const { data } = await supabase
					.from("notifications")
					.select("*")
					.eq("user_id", userId)
					.order("created_at", { ascending: false })
					.limit(20);

				setNotifications(data || []);
				setUnreadCount((data || []).filter((n) => !n.read).length);
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchNotifications();

		// Realtime subscription
		if (!userId) return;

		const channel = supabase
			.channel(`notifications-${userId}`)
			.on(
				"postgres_changes",
				{
					event: "INSERT",
					schema: "public",
					table: "notifications",
					filter: `user_id=eq.${userId}`,
				},
				(payload) => {
					setNotifications((prev) => [payload.new as Notification, ...prev]);
					setUnreadCount((prev) => prev + 1);
				},
			)
			.subscribe();

		return () => {
			supabase.removeChannel(channel);
		};
	}, [userId]);

	const markAsRead = async (notificationId: string) => {
		try {
			if (!userId) return;

			setNotificationInMark(notificationId);

			await supabase
				.from("notifications")
				.update({ read: true })
				.eq("id", notificationId)
				.eq("user_id", userId);

			setNotifications((prev) =>
				prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n)),
			);
			setUnreadCount((prev) => Math.max(prev - 1, 0));
		} catch (error) {
			console.error(error);
			toast.error("Error marking notification as read");
		}
	};
	const markAllAsRead = async () => {
		try {
			setIsMarkingAll(true);
			if (!userId) return;

			await supabase
				.from("notifications")
				.update({ read: true })
				.eq("user_id", userId);

			setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
			setUnreadCount(0);
		} catch (error) {
			console.error(error);
			toast.error("Error marking all notifications as read");
		} finally {
			setIsMarkingAll(false);
		}
	};

	const deleteAll = async () => {
		if (!userId) return;

		await supabase.from("notifications").delete().eq("user_id", userId);

		setNotifications([]);
		setUnreadCount(0);
	};

	const deleteNotification = async (notificationId: string) => {
		try {
			setNotificationInDelete(notificationId);
			await supabase.from("notifications").delete().eq("id", notificationId);
			setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
		} catch (error) {
			console.error(error);
			toast.error("Error deleting notification");
		} finally {
			setNotificationInDelete(null);
		}
	};

	const isEmpty = notifications.length === 0;

	return {
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
	};
}
