import { SidebarMenuSub } from "../../ui/sidebar";
import { FeedMenuItem } from "./FeedMenuItem";
import { useSidebar } from "./useSidebar";


export const FeedMenu = () => {
    const { feedItems } = useSidebar();
    return (
        <SidebarMenuSub className="ml-0 border-l-0 pl-0">
            {feedItems.map((item) => (
                <FeedMenuItem
                    key={item.title}
                    item={item}
                />
            ))}
        </SidebarMenuSub>
    );
};