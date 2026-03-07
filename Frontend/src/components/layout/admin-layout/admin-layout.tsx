import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet, useLocation } from "react-router-dom";
import {
  IconChartBar,
  IconDashboard,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconLayoutDashboard,
  IconListDetails,
  IconSearch,
  IconSettings,
  IconUserEdit,
  IconUsers,
} from "@tabler/icons-react";

const data = {
  user: {
    name: "Stella",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: IconDashboard,
    },
    {
      title: "Lifecycle",
      url: "#",
      icon: IconListDetails,
    },
    {
      title: "Analytics",
      url: "#",
      icon: IconChartBar,
    },
    {
      title: "Projects",
      url: "#",
      icon: IconFolder,
    },
    {
      title: "Team",
      url: "#",
      icon: IconUsers,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      title: "Category Management",
      url: "/category",
      icon: IconLayoutDashboard,
    },
    {
      title: "Author Management",
      url: "/author",
      icon: IconUserEdit,
    },
    {
      title: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },
  ],
};

export default function AdminLayout() {
  const { pathname } = useLocation();
  const allItem = [...data.navMain, ...data.navSecondary, ...data.documents];

  const currentItem = allItem.find((item) => item.url === pathname);
  return (
    <SidebarProvider>
      <AppSidebar data={data} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <h3 className=" text-xl font-bold ">{currentItem?.title}</h3>
          </div>
        </header>
        <div className="flex p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
