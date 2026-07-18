import { Button } from "../../../../shared/components/ui/button"
import { Input } from "../../../../shared/components/ui/input"
import styles from "./style.module.css"
import { useNavigate } from "react-router-dom"
import { NAVIGATION_LIST } from "../../../../shared/const/navigation"
import { useRegister } from "../../hooks/useRegister"
import { useIsMobile } from "../../../../shared/components/layouts/BaseLayout/useMobile"

export const RegisterTemplate = () => {
    const navigate = useNavigate();
    const isMobile = useIsMobile();
    const { 
        email,
        name,
        password,
        inputEmail,
        inputName,
        inputPassword,
        register
    } = useRegister();

    const handleRegister = async (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        await register();
        navigate(NAVIGATION_LIST.LOGIN);
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>ユーザー登録</h1>
            <form className={styles.form} onSubmit={handleRegister}>
                <div className={styles.area}>
                    <Input
                        type="email"
                        placeholder="Email"
                        variant="primary"
                        inputSize={isMobile ? "xl" : "md"}
                        onChange={inputEmail}
                        value={email}
                    /> 
                </div>
                <div className={styles.area}>
                    <Input
                        type="text"
                        placeholder="Name"
                        variant="primary"
                        inputSize={isMobile ? "xl" : "md"}
                        onChange={inputName}
                        value={name}
                    />
                </div>
                <div className={styles.area}>
                    <Input
                        type="password"
                        placeholder="Password"
                        variant="primary"
                        inputSize={isMobile ? "xl" : "md"}
                        onChange={inputPassword}
                        value={password}
                    /> 
                </div>
                <div className={styles.area}>
                    <Button type="submit" size="lg">登録</Button>
                </div>
            </form>
        </div>
    )
}