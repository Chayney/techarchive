import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useAuthContext } from "../../../../features/auth/hooks/useAuthContext";
import styles from "./style.module.css";

type Props = {
    title: string | null;
    keyword: string;
    onKeywordChange: (value: string) => void;
    onSearch: (value: string) => void;
    actions?: React.ReactNode;
};

export const Header = ({
    title,
    keyword,
    onKeywordChange,
    onSearch,
    actions
}: Props) => {
    const { logout } = useAuthContext();

    return (
        <header className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.content}>
                <Input
                    value={keyword}
                    placeholder="Search..."
                    onChange={(e) =>
                        onKeywordChange(e.target.value)
                    }
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            onSearch(keyword);
                        }
                    }}
                    inputSize="lg"
                />
                {actions}
                <Button
                    variant="secondary"
                    onClick={logout}
                >
                    ログアウト
                </Button>
            </div>
        </header>
    );
};