import { SidebarProvider } from "../../ui/sidebar"
import { AppSidebar } from "../Navigation/AppSidebar"
import styles from "./style.module.css"

export const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <div className={styles.layout}>
                <AppSidebar />
                <div className={styles.main}>
                    {children}
                </div>
            </div>
        </SidebarProvider>
    )
}