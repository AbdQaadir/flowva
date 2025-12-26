import type { User } from "@supabase/supabase-js";

export type ExtendedUser = User & {
	created_at?: string;
	email?: string;
	first_name?: string;
	last_name?: string;
	onboarding_completed?: boolean;
	updated_at?: string;
	points?: number;
	referral_code?: string;
	referred_by?: string;
	referral_count?: number;
	referral_points?: number;
};
