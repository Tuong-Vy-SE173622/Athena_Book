import { axiosClient } from "@/core/servers/api.server";
import { API_PATH } from "@/core/constants/api-path.constant";
import type { IAuthorRequest } from "../models/AuthorManagement";
import { toFormData } from "@/utils/to-form-data";

export class AuthorManagementServer {
  async getAuthorList() {
    return axiosClient.get(API_PATH.ADMIN.AUTHOR_MANAGEMENT);
  }

  async createAuthor(payload: IAuthorRequest) {
    return axiosClient.post(
      API_PATH.ADMIN.AUTHOR_MANAGEMENT,
      toFormData(payload),
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
  }

  async updateAuthor(id: string, payload: IAuthorRequest) {
    return axiosClient.put(
      `${API_PATH.ADMIN.AUTHOR_MANAGEMENT}/${id}`,
      toFormData(payload),
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
  }

  async deleteAuthor(id: string) {
    return axiosClient.delete(`${API_PATH.ADMIN.AUTHOR_MANAGEMENT}/${id}`);
  }
}
