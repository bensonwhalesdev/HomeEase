export type Product = {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
  color: string;
  size?: string;
  rating?: number;
  reviews?: number;
  brand?: string;
};