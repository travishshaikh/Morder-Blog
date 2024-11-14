export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: Author;
  image: string;
  tags: string[];
  category: string;
  createdAt: string;
}

export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  featured: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  isPremium: boolean;
}