import AdminLayout from "@/components/layout/admin-layout/admin-layout";
import AuthorManagement from "@/features/admin/components/AuthorManagement/AuthorManagement";
import CategoryManagement from "@/features/admin/components/CategoryManagement/CategoryManagement";
import type { RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        path: "/",
        element: <CategoryManagement />,
      },
      {
        path: "/category",
        element: <CategoryManagement />,
      },
      {
        path: "/author",
        element: <AuthorManagement />,
      },
    ],
  },
];
