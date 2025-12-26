export type Notification = {
	id: string;
	user_id: string;
	type: string;
	content: {
		title: string;
		body: string;
		icon: string;
		link: string;
		metadata: Record<string, string | number | boolean | object>;
	};

	created_at: string;
	related_token: string | null;
	read: boolean;
};
