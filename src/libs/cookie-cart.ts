import type { ProductCart } from '@/interfaces/cart.interface';
import Cookies from 'js-cookie';

export class CookieCart {
  static addToCart(product: ProductCart) {
    const productsInCart = this.getCart();

    const productIndex = productsInCart.findIndex((p) => p.productId === product.productId && p.size === product.size);

    if (productIndex !== -1) {
      productsInCart[productIndex].quantity += product.quantity;
    } else {
      productsInCart.push(product);
    }

    Cookies.set('cart', JSON.stringify(productsInCart));

    return productsInCart;
  }

  static getCart(): ProductCart[] {
    return JSON.parse(Cookies.get('cart') ?? '[]');
  }

  static async removeFromCart(product: ProductCart) {
    const productsInCart = this.getCart();
    const newProductsInCart = productsInCart.filter((p) => p.productId !== product.productId || p.size !== product.size);
    Cookies.set('cart', JSON.stringify(newProductsInCart));
    return newProductsInCart;
  }

  static async clearCart() {
    Cookies.remove('cart');
  }
}
