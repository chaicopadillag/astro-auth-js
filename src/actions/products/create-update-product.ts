import { Cloudinary } from '@/libs/cloudinary';
import { defineAction } from 'astro:actions';
import { db, eq, Product, ProductImage } from 'astro:db';
import { z } from 'astro:schema';
import { getSession } from 'auth-astro/server';
import { v4 as uuid } from 'uuid';

export const createUpdateProduct = defineAction({
  accept: 'form',
  input: z.object({
    id: z.string().optional(),
    description: z.string(),
    gender: z.string(),
    price: z.number(),
    sizes: z.string(),
    slug: z.string(),
    title: z.string(),
    stock: z.number(),
    tags: z.string(),
    type: z.string(),

    imageFiles: z
      .array(
        z
          .instanceof(File)
          .refine((file) => file.size < 1024 * 1024 * 5, 'File size must be less than 5MB')
          .refine((file) => ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type), 'File must be a JPEG or PNG image')
      )
      .optional()
  }),
  handler: async (body, { request }) => {
    try {
      const session = await getSession(request);

      if (!session) {
        throw new Error('Unauthorized');
      }

      const { id, slug, imageFiles, ...restBody } = body;

      const queries: any = [];
      const urlImages: string[] = [];

      if (imageFiles && imageFiles.length > 0) {
        const uploadPromises = imageFiles.map((file) => Cloudinary.uploadFile(file));

        const urls = await Promise.all(uploadPromises);
        urlImages.push(...urls);
      }

      const product = {
        ...restBody,
        id: id ?? uuid(),
        createdBy: (session.user as any).id,
        slug: slug.toLowerCase().replaceAll(/ /g, '-').trim()
      };

      if (id) {
        queries.push(db.update(Product).set(product).where(eq(Product.id, id)));
      } else {
        queries.push(db.insert(Product).values(product));
      }

      if (urlImages.length > 0) {
        for (const url of urlImages) {
          queries.push(db.insert(ProductImage).values({ id: uuid(), image: url, productId: product.id }));
        }
      }

      await db.batch(queries);

      return product;
    } catch (error) {
      console.log('Error at createUpdateProduct', error);
      throw new Error('Error at createUpdateProduct');
    }
  }
});
