export interface IPublisher {
  _id: string;
  name: string;
  logo: string;
  description: string;
  createdAt: string;
  slug: string;
}

export interface IPublisherPayload {
  name: string;
  description: string;
  logo?: File | null;
}
