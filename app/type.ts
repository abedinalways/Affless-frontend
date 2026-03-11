export type ExposureTier = {
  label: string;
  exposure: string;
  quickMatch: string;
  zone: "benefit" | "neutral" | "penalty";
  minHours: number;
  maxHours: number;
};

type OrderStatus = "pending" | "in_progress" | "cancelled" | "completed" | "delivered";

export type Order = {
  id: number;
  title: string;
  price: number;
  days: number;
  status: OrderStatus;
  img: string;
}