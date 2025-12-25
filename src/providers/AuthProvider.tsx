import type { Session, User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import supabase from "@/lib/supabase";

type ExtendedUser = User & {
	created_at?: string;
	email?: string;
	first_name?: string;
	last_name?: string;
	onboarding_completed?: boolean;
	updated_at?: string;
};

type AuthContextType = {
	session: Session | null;
	user: ExtendedUser | null;
	loading: boolean;
	handleLogout: () => void;
};

const AuthContext = createContext<AuthContextType>({
	session: null,
	user: null,
	loading: true,
	handleLogout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [session, setSession] = useState<Session | null>(null);
	const [user, setUser] = useState<ExtendedUser | null>(null);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		supabase.auth.getSession().then(({ data }) => {
			setSession(data.session);
			setUser(data.session?.user ?? null);
			setLoading(false);
		});

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);

			// Fetch user profile
			supabase
				.from("profiles")
				.select("*")
				.eq("id", session?.user?.id)
				.single()
				.then(({ data }) => {
					setUser({
						...session?.user,
						...data,
					});
				});
		});

		return () => subscription.unsubscribe();
	}, []);

	const handleLogout = async () => {
		setLoading(true);
		try {
			await supabase.auth.signOut();
			window.location.reload();
		} catch (error) {
			console.error("Error logging out:", error);
		} finally {
			setLoading(false);
		}
	};
	return (
		<AuthContext.Provider value={{ session, user, loading, handleLogout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
