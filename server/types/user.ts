export interface AuthPayload {
  username: string;
  id: string;
  iat?: number;
  exp?: number;
}

export type Category = "rings" | "charms-dangles" | "necklaces" | "bracelets";
