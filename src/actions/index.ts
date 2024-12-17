import { loginUser, logout, registerUser } from './auth';
import { getProductPaginate } from './products/get-products-paginate';

export const server = {
  loginUser,
  logout,
  registerUser,
  getProductPaginate
};
