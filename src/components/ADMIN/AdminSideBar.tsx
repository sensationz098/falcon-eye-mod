import { Calendar, Home, Inbox, LucideIcon } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import * as React from "react";

// Menu items.
const items = [
  {
    title: "Hoem",
    url: "/admin",
    Icon: Home,
  },
  {
    title: "User",
    url: "/admin/user",
    Icon: Inbox,
  },
  {
    title: "Employee",
    url: "/admin/employee",
    Icon: Inbox,
  },
  {
    title: "Payroll",
    url: "/admin/payroll",
    Icon: Calendar,
  },
];

const OpenToolTipProvider = ({
  title,
  icon,
  url,
}: {
  title: string;
  icon: LucideIcon;
  url: string;
}) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger className="rounded-[6px] p-1 hover:bg-gray-400">
        <Link href={url} className="">
          {React.createElement(icon)}
        </Link>
      </TooltipTrigger>
      <TooltipContent
        align="center"
        side="right"
        className="w-18 h-8 text-balance rounded-[5px] p-2"
      >
        <p>{title}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const AdminSideBar = () => {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-center text-xl">
            Falcon Eye EMS
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    {/* <OpenToolTipProvider
                      title={item.title}
                      icon={item.Icon}
                      url={item.url}
                    /> */}
                    <Link href={item.url}>
                      <item.Icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSideBar;
