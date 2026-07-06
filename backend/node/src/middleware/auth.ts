import { supabase } from "../config/supabaseClient";
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

    // supabaseから取得したdata.userをAuthUser型に代入
    const user: AuthUser = {
        id: data.user.id,
        email: data.user.email
    }
    // ミドルウェア後のルートでreq.userにアクセスした時、型チェックが有効
    req.user = user;

    next();
}