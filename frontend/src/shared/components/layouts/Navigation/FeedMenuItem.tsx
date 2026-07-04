import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
} from "../../ui/sidebar";

import { cn } from "../../../lib/utils";

type FeedChild = {
    title: string;
    url: string;
};

type FeedItem = {
    title: string;
    url?: string;
    icon?: React.ElementType;
    children?: FeedChild[];
};

type Props = {
    item: FeedItem;
};

export const FeedMenuItem = ({ item }: Props) => {
    const [open, setOpen] = useState(false);
    const hasChildren = !!item.children?.length;

    return (
        <SidebarMenuItem>
            <SidebarMenuButton
                onClick={() => hasChildren && setOpen((prev) => !prev)}
                className="flex items-center justify-between w-full"
            >
                <div className="flex items-center gap-2 flex-1">

                    {/* Chevron（子がある時だけ） */}
                    {hasChildren && (
                        <ChevronRight
                            className={cn(
                                "h-4 w-4 transition-transform",
                                open && "rotate-90"
                            )}
                        />
                    )}

                    {/* icon */}
                    {item.icon && (
                        <item.icon className="h-4 w-4" />
                    )}

                    {/* label */}
                    {item.url ? (
                        // Allだけリンク
                        <Link
                            to={item.url}
                            onClick={(e) => hasChildren && e.stopPropagation()}
                            className="flex-1"
                        >
                            {item.title}
                        </Link>
                    ) : (
                        <span>{item.title}</span>
                    )}
                </div>
            </SidebarMenuButton>

            {/* children */}
            {hasChildren && open && (
                <SidebarMenuSub>
                    {item.children?.map((child) => (
                        <SidebarMenuItem key={child.url}>
                            <SidebarMenuButton asChild>
                                <Link to={child.url}>
                                    <span>{child.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenuSub>
            )}
        </SidebarMenuItem>
    );
};