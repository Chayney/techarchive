import type { Session, User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "../../../shared/lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { NAVIGATION_LIST } from "../../../shared/const/navigation";

export const useAuth = () => {
    const navigate = useNavigate();

    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [profileId, setProfileId] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    const [loginDialogOpen, setLoginDialogOpen] = useState(false);

    const fetchProfileId = async (userId: string) => {
        const { data, error } = await supabase
            .from("profiles")
            .select("id")
            .eq("user_id", userId)
            .single();

        if (error) {
            console.error(error);
            return;
        }

        setProfileId(data.id);
    };

    useEffect(() => {
        supabase.auth.getSession().then(async ({ data }) => {
            const currentUser = data.session?.user ?? null;
            setSession(data.session);
            setUser(currentUser);
            if (currentUser) {
                await fetchProfileId(currentUser.id);
            }

            setLoading(false);
        });

        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session);
                setUser(session?.user ?? null);

                if (session?.user) {
                    fetchProfileId(session.user.id);
                } else {
                    setProfileId(0);
                }
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
        profileId,
        setProfileId,
        logout,
        requireAuth,
        loginDialogOpen,
        setLoginDialogOpen,
        handleGoLogin,
    };
};