export interface ICategory {
  title: string;
  isActive?: boolean;
}
export interface IProduct {
  _id: string | number;
  title: string;
  category: string
  image: string
  price: string
}
