import { Profile } from "../../profile/models/profile.model";

export interface Article {
  id: number; // ✅ Add this line
  slug: string;
  titre: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
}
