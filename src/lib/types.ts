export interface Review {
  id: number;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  keywords: string[];
  rating: number;
  reviewCount: number;
  reviews: Review[];
}

export interface CartItem extends Product {
  quantity: number;
}
