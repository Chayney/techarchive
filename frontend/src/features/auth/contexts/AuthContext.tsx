import type { Session, User } from "@supabase/supabase-js";
import { createContext, type FC, type ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";

type AuthContextProps = {
    children: ReactNode;
};

type AuthContextType = {
    session: Session | null;
    user: User | null;
    loading: boolean;
    isAuth: boolean;
    logout: () => Promise<void>;
    requireAuth: () => boolean;
    loginDialogOpen: boolean;
    setLoginDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleGoLogin: () => void;
};

export const AuthContext = createContext<AuthContextType>({
    session: null,
    user: null,
    loading: true,
    isAuth: false,
    logout: async () => { },
    requireAuth: () => false,
    loginDialogOpen: false,
    setLoginDialogOpen: () => { },
    handleGoLogin: () => { },
});

export const AuthProvider: FC<AuthContextProps> = ({ children }) => {
    const {
        session,
        user,
        loading,
        isAuth,
        logout,
        requireAuth,
        loginDialogOpen,
        setLoginDialogOpen,
        handleGoLogin,
    } = useAuth();

    return (
        <AuthContext.Provider
            value={{
                session,
                user,
                loading,
                isAuth,
                logout,

                // ⭐追加
                requireAuth,
                loginDialogOpen,
                setLoginDialogOpen,
                handleGoLogin,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};