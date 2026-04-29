export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image: string;
  rating: number;
}

export interface ProductListResponse {
  count: number;
  products: Product[];
}
