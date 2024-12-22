import { defineAction } from 'astro:actions';
import { db, eq, Product } from 'astro:db';
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
    type: z.string()
  }),
  handler: async (body, { request }) => {
    try {
      const session = await getSession(request);

      if (!session) {
        throw new Error('Unauthorized');
      }

      const product = {
        ...body,
        id: body?.id ?? uuid(),
        createdBy: (session.user as any).id,
        slug: body.slug.toLowerCase().replaceAll(/ /g, '-').trim()
      };

      if (body?.id) {
        await db.update(Product).set(product).where(eq(Product.id, body.id));
      } else {
        await db.insert(Product).values(product);
      }

      return product;
    } catch (error) {
      console.log('Error at createUpdateProduct', error);
      throw new Error('Error at createUpdateProduct');
    }
  }
});
