import type { ProductCart } from '@/interfaces/cart.interface';
import { defineAction } from 'astro:actions';
import { db, eq, inArray, Product, ProductImage } from 'astro:db';

export const getProductsInCart = defineAction({
  accept: 'json',
  async handler(_, { cookies }) {
    const productsInCart = JSON.parse(cookies.get('cart')?.value ?? '[]') as ProductCart[];
    const ids = productsInCart.map((product) => product.productId);

    const productsDb = await db
      .select()
      .from(Product)
      .innerJoin(ProductImage, eq(Product.id, ProductImage.productId))
      .where(inArray(Product.id, ids));

    const products = productsInCart.map((item) => {
      const productDb = productsDb.find((p) => p.Product.id === item.productId);

      if (!productDb) {
        throw new Error(`Product with id ${item.productId} not found`);
      }

      const { id, slug, title, price } = productDb.Product;
      const { image } = productDb.ProductImage;
      return {
        id,
        slug,
        title,
        price,
        image: image.startsWith('http') ? image : `${import.meta.env.PUBLIC_APP_URL}/images/products/${image}`,
        quantity: item.quantity,
        size: item.size
      };
    });

    return products;
  }
});
