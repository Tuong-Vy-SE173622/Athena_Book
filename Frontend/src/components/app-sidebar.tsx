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
import { LibraryBig } from "lucide-react";
import type { Icon } from "@tabler/icons-react";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  data: {
    user: { name: string; email: string; avatar: string };
    navMain: { title: string; url: string; icon: Icon }[]; // ← đổi
    navSecondary: { title: string; url: string; icon: Icon }[]; // ← đổi
    documents: { title: string; url: string; icon: Icon }[]; // ← đổi
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
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <div className="bg-[#0066FF] p-2 rounded-lg">
                  <LibraryBig className="!size-5" color="white" />
                </div>
                <span className="text-lg font-semibold ">Athena</span>
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
