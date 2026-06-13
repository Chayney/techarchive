import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from "../../ui/sidebar"
import { FavoriteMenu } from "./FavoriteMenu";
import { MainMenu } from "./MainMenu";

export const AppSidebar = () => {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Main</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <MainMenu />
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>My Feed</SidebarGroupLabel>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Favorite</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <FavoriteMenu />
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}