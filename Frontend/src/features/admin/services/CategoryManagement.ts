import { axiosClient } from "@/core/servers/api.server";
import { API_PATH } from "@/core/constants/api-path.constant";
import type { ICategoryRequest } from "../models/CategoryManagement";

export class CategoryManagementServer {
  async getCategoryList() {
    return axiosClient.get(API_PATH.ADMIN.CATEGORY_MANAGEMENT);
  }

  async createCategory(payload: ICategoryRequest) {
    return axiosClient.post(API_PATH.ADMIN.CATEGORY_MANAGEMENT, payload);
  }

  async updateCategory(id: string, payload: ICategoryRequest) {
    return axiosClient.put(
      `${API_PATH.ADMIN.CATEGORY_MANAGEMENT}/${id}`,
      payload,
    );
  }

  async deleteCategory(id: string) {
    return axiosClient.delete(`${API_PATH.ADMIN.CATEGORY_MANAGEMENT}/${id}`);
  }
}
