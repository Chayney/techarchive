import { Link } from "react-router-dom"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../../ui/sidebar"
import { useSidebar } from "./useSidebar";

export const FavoriteMenu = () => {
    const { favoriteItems } = useSidebar();
    
    return (
        <SidebarMenu>
            {favoriteItems?.map((favorite) => (
                <SidebarMenuItem key={favorite.category_id}>
                    <SidebarMenuButton asChild>
                        <Link to={`${favorite.url}/${favorite.category_id}`}>
                            <favorite.icon className="text-red-500 fill-red-500" />
                            <span>{favorite.title}</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    )
}