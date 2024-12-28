import { loginUser, logout, registerUser } from './auth';
import { createUpdateProduct } from './products/create-update-product';
import { deleteImageProduct } from './products/delete-product-image';
import { getProductBySlug } from './products/get-product-slug';
import { getProductsInCart } from './products/get-products-in-cart';
import { getProductPaginate } from './products/get-products-paginate';

export const server = {
  loginUser,
  logout,
  registerUser,
  getProductPaginate,
  getProductBySlug,
  getProductsInCart,
  createUpdateProduct,
  deleteImageProduct
};
