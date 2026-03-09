import * as React from "react";
import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { Icon } from "@tabler/icons-react";
import athenLogoDark from "@/assets/athena-logo-dark.svg";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  data: {
    user: { name: string; email: string; avatar: string };
    navMain: { title: string; url: string; icon: Icon }[];
    navSecondary: { title: string; url: string; icon: Icon }[];
    documents: { title: string; url: string; icon: Icon }[];
  };
}

export function AppSidebar({ data, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 hover:!bg-transparent"
            >
              <a href="#">
                <div className=" p-2 rounded-lg">
                  <img src={athenLogoDark} alt="logo" className="w-9" />
                </div>
                <span className="text-2xl font-bold ml-[-10px] text-[#0008A6]">
                  Athena
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
