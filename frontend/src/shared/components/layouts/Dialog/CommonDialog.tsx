import { useAuthContext } from "../../../../features/auth/hooks/useAuthContext";
import { Button } from "../../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../../ui/dialog";

export const LoginRequiredDialog = () => {
    const {
        loginDialogOpen,
        setLoginDialogOpen,
        handleGoLogin,
    } = useAuthContext();

    return (
        <Dialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen}>
            <DialogContent>
                <DialogTitle>ログインが必要です</DialogTitle>

                <p className="text-sm text-muted-foreground">
                    この機能を使うにはログインが必要です。
                    ログイン画面に移動しますか？
                </p>

                <div className="flex justify-end gap-2 mt-4">
                    <Button
                        variant="secondary"
                        onClick={() => setLoginDialogOpen(false)}
                    >
                        キャンセル
                    </Button>

                    <Button onClick={handleGoLogin}>
                        ログインへ
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};