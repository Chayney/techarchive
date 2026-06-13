import { Link } from "react-router-dom";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../../ui/sidebar"
import { useSidebar } from "./useSidebar"

export const MainMenu = () => {
    const { mainItems } = useSidebar();

    return (
        <SidebarMenu>
            {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                    {/* SidebarMenuButtonが内部でdisplay: flexを持っているこれで横並びにする */}
                    <SidebarMenuButton asChild>
                        <Link to={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    )
}