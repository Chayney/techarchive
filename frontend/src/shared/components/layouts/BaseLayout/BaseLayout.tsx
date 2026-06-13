import { SidebarProvider } from "../../ui/sidebar"
import { AppSidebar } from "../Navigation/AppSidebar"

export const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main>
                <div>
                    {children}
                </div>
            </main>
        </SidebarProvider>
    )
}