import { Product } from './product.model';

export interface Order {
  _id?: string;
  userId: number;
  productIds: string[] | Product[];
  totalAmount: number;
  createdAt?: Date;
  updatedAt?: Date;
}
