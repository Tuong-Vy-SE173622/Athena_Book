export interface IAuthor {
  _id: string;
  authorName: string;
  createdAt: string;
  authorSlug: string;
  authorBiography: string;
  authorAvatar: string | null;
}

export interface IAuthorRequest {
  authorName: string;
  authorBiography: string;
  authorAvatar?: File | null;
}
