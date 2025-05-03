export type Role = 'USER' | 'ADMIN' | 'CONTRIBUTOR';

export interface User {
  email: string;
  token: string;
  nom: string;
  id_user: number,
  grade: string,
  bio: string;
  image: string;
  role: Role; // Ajout du champ role
}