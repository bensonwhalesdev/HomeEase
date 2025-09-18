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

export type CreateProductInput = Omit<Product, "id" | "rating" | "reviews">;

export type UpdateProductInput = Omit<Product, "reviews" | "rating"> & { id: string };
