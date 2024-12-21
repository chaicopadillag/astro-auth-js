import { loginUser, logout, registerUser } from './auth';
import { getProductBySlug } from './products/get-product-slug';
import { getProductsInCart } from './products/get-products-in-cart';
import { getProductPaginate } from './products/get-products-paginate';

export const server = {
  loginUser,
  logout,
  registerUser,
  getProductPaginate,
  getProductBySlug,
  getProductsInCart
};
