import type { Session, User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "../../../shared/lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { NAVIGATION_LIST } from "../../../shared/const/navigation";

export const useAuth = () => {
    const navigate = useNavigate();

    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const [loginDialogOpen, setLoginDialogOpen] = useState(false);

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setSession(data.session);
            setUser(data.session?.user ?? null);
            setLoading(false);
        });

        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session);
                setUser(session?.user ?? null);
            }
        );

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    const logout = async () => {
        await supabase.auth.signOut();
        setSession(null);
        setUser(null);
        navigate(NAVIGATION_LIST.LOGIN);
    };

    const requireAuth = () => {
        if (session) return true;

        setLoginDialogOpen(true);
        return false;
    };

    const handleGoLogin = () => {
        setLoginDialogOpen(false);
        navigate(NAVIGATION_LIST.LOGIN);
    };

    return {
        session,
        user,
        loading,
        isAuth: !!session,
        logout,
        requireAuth,
        loginDialogOpen,
        setLoginDialogOpen,
        handleGoLogin,
    };
};