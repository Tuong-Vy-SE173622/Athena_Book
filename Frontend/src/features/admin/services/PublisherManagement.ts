import { API_PATH } from "@/core/constants/api-path.constant";
import { axiosClient } from "@/core/servers/api.server";
import { toFormData } from "axios";
import type { IPublisherPayload } from "../models/PublisherManagement";

export class PublisherManagementServer {
  async getPublisherList() {
    return axiosClient.get(API_PATH.ADMIN.PUBLISHER_MANAGEMENT);
  }
  async createPublisher(payload: IPublisherPayload) {
    return axiosClient.post(
      API_PATH.ADMIN.PUBLISHER_MANAGEMENT,
      toFormData(payload),
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
  }

  async updatePublisher(id: string, payload: IPublisherPayload) {
    return axiosClient.put(
      `${API_PATH.ADMIN.PUBLISHER_MANAGEMENT}/${id}`,
      toFormData(payload),
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
  }

  async deletePublisher(id: string) {
    return axiosClient.delete(`${API_PATH.ADMIN.PUBLISHER_MANAGEMENT}/${id}`);
  }
}
