export interface User {
  email: string,
  password: string
}

export interface Message {
  message: string
}

export interface Category {
  name: string,
  imageSrc: string,
  user?: string,
  _id?: string
}

export interface Product {
  name: string,
  imageSrc: string,
  categoryId: string,
  brandId: string,
  cost: number,
  price: number,
  _id?: string
}
