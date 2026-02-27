export interface CategoryItem {
  _id: string;
  categoryName: string;
}

export interface ICategoryRequest {
  categoryName: string;
}

export interface ICategoryResponse {
  _id: string;
  categoryName: string;
  createdAt: string;
  categorySlug: string;
}
