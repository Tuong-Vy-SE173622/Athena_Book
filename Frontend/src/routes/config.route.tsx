import AdminLayout from "@/components/layout/admin-layout/admin-layout";
import CategoryManagement from "@/features/admin/components/category-management/CategoryManagement";
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
    ],
  },
];
