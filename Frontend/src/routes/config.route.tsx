import AdminLayout from "@/components/layout/admin-layout/admin-layout";
import CategoryManagement from "@/features/admin/category-management/category-management";
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
