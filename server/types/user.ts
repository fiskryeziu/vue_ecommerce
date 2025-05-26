export interface AuthPayload {
  username: string;
  iat?: number;
  exp?: number;
}

export type Category = "rings" | "charms-dangles" | "necklaces" | "bracelets";
