import { Link } from "react-router-dom";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "../../ui/sidebar";
import { useSidebar } from "./useSidebar";

type Props = {
    collapsed: boolean;
};

export const FavoriteMenu = ({ collapsed }: Props) => {
    const { favoriteItems } = useSidebar();
    
    return (
        <SidebarMenu>
            {favoriteItems.map((item) => (
                <SidebarMenuItem key={item.category_id}>
                    <Link to={`${item.url}/${item.category_id}`}>
                        <SidebarMenuButton>
                            <item.icon className="text-red-500 fill-red-500" />
                            {!collapsed && <span>{item.title}</span>}
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    );
};