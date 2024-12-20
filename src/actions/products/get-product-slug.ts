import { defineAction } from 'astro:actions';
import { db, eq, Product, ProductImage } from 'astro:db';
import { z } from 'astro:schema';

export const getProductBySlug = defineAction({
  accept: 'json',
  input: z.object({
    slug: z.string()
  }),
  handler: async ({ slug }) => {
    const product = await db.select().from(Product).where(eq(Product.slug, slug)).get();

    if (!product) {
      throw new Error('Product not found');
    }

    const images = await db.select().from(ProductImage).where(eq(ProductImage.productId, product.id));

    return {
      ...product,
      images: images.map((image) => image.image)
    };
  }
});
