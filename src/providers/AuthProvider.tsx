import type { Session, User } from "@supabase/supabase-js";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { createContext, useContext, useEffect, useState } from "react";
import supabase from "@/lib/supabase";

type AuthContextType = {
	session: Session | null;
	user: User | null;
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
	const navigate = useNavigate();
	const [session, setSession] = useState<Session | null>(null);
	const [user, setUser] = useState<User | null>(null);
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
			setUser(session?.user ?? null);
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
