// expressのRequest型をグローバルで拡張
// ルートハンドラーはRequestHandler型なので、Request型を直接型エイリアスに置き換えることはできない
// req.userがAuthUser | undefined としてどこでも型チェックできるようにする

export interface AuthUser {
    id: string;
    email?: string | null;
}

declare global {
    namespace Express {
        interface Request {
            user?: AuthUser;
        }
    }
}
