import { createSupabaseClientWithToken, supabase } from "../config/supabaseClient";
import { AuthUser } from "../types/express";
import { NextFunction, Request, Response } from "express";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'No token provided'
        });
    }
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data.user) {
        return res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }

    const supabaseUser = createSupabaseClientWithToken(token)
    const { data: profile } = await supabaseUser
    .from("profiles")
    .select("id")
    .eq("user_id", data.user.id)
    .single();

    // supabaseから取得したdata.userをAuthUser型に代入
    const user: AuthUser = {
        id: data.user.id,
        email: data.user.email,
        profile_id: profile?.id
    }
    // ミドルウェア後のルートでreq.userにアクセスした時、型チェックが有効
    req.user = user;

    next();
}

export const optionalAuthMiddleware = async (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization?.replace("Bearer ", "");

    console.log("token:", token);

    if (!token) {
        console.log("guest");
        return next();
    }

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
        console.log("invalid token");
        return next();
    }

    const supabaseUser = createSupabaseClientWithToken(token)
    const { data: profile } = await supabaseUser
        .from("profiles")
        .select("id")
        .eq("user_id", data.user.id)
        .single();
    
    console.log("auth user id:", data.user.id);
    console.log("profile:", profile);

    req.user = {
        id: data.user.id,
        email: data.user.email,
        profile_id: profile?.id
    };

    next();
};