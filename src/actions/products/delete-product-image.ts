import { Cloudinary } from '@/libs/cloudinary';
import { defineAction } from 'astro:actions';
import { db, eq, ProductImage } from 'astro:db';
import { z } from 'astro:schema';
import { getSession } from 'auth-astro/server';

export const deleteImageProduct = defineAction({
  accept: 'json',
  input: z.object({
    imageId: z.string()
  }),
  handler: async ({ imageId }, { request }) => {
    const session = await getSession(request);

    if (!session) {
      throw new Error('Unauthorized');
    }

    const productImage = await db.select().from(ProductImage).where(eq(ProductImage.id, imageId)).get();

    if (!productImage) {
      throw new Error('Image not found');
    }

    const deletedProductImage = await db.delete(ProductImage).where(eq(ProductImage.id, imageId)).run();
    console.log({ deletedProductImage });

    if (productImage.image.includes('http')) {
      const resDeleted = await Cloudinary.deleteFile(productImage.image);
      console.log({ resDeleted });
    }

    return {
      statusCode: 200
    };
  }
});
