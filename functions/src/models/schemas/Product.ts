import { faker } from "@faker-js/faker";

export interface ProductInterface {
  id?: number;
  name: string;
  price: number;
  description: string;
  product: string;
  color: string;
  image: string;
  created_at?: string;
  updated_at?: string;
}

export class Product {
  id: number;
  name: string;
  price: number;
  description: string;
  product: string;
  color: string;
  image: string;
  created_at: string;
  updated_at: string;

  constructor(payload: ProductInterface) {
    this.id = payload.id ?? faker.number.int();
    this.name = payload.name;
    this.price = payload.price;
    this.description = payload.description;
    this.product = payload.product;
    this.color = payload.color;
    this.image = payload.image;
    this.created_at = payload.created_at ?? new Date().toISOString();
    this.updated_at = payload.updated_at ?? new Date().toISOString();
  }
}
