export interface AuthPayload {
  username: string;
  id: string;
  iat?: number;
  exp?: number;
}

export type Category = "rings" | "charms-dangles" | "necklaces" | "bracelets";

interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
}

export interface CreateOrderPayload {
  userId: string;
  paymentIntentId: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  country: string;
  city: string;
  zipCode: string;
  totalPrice: number;
  status: string;
  items: OrderItem[];
}
