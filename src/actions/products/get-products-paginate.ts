import { defineAction } from 'astro:actions';
import { count, db, Product, sql } from 'astro:db';
import { z } from 'astro:schema';

export const getProductPaginate = defineAction({
  accept: 'json',
  input: z.object({
    page: z.number().optional(),
    perPage: z.number().optional()
  }),
  handler: async ({ page = 1, perPage = 10 }) => {
    const page_ = page <= 0 ? 1 : page;
    const perPage_ = perPage < 0 ? 0 : perPage;
    const offset = (page_ - 1) * perPage_;

    const [records] = await db
      .select({
        count: count()
      })
      .from(Product);

    const total = records.count;

    const totalPages = Math.ceil(total / perPage_);

    if (page_ > totalPages) {
      return {
        products: [],
        page: page_,
        perPage: perPage_,
        totalPages,
        total
      };
    }

    // const products = await db.select().from(Product).innerJoin(ProductImage, eq(Product.id, ProductImage.productId)).limit(perPage_).offset(offset);

    const query = sql`
      SELECT p.*,
      (SELECT GROUP_CONCAT(image, ',') FROM (SELECT * FROM ProductImage as i WHERE i.productId = p.id LIMIT 2)) as images
      FROM Product as p
      LIMIT ${perPage_}
      OFFSET ${offset}
    `;

    const { rows } = await db.run(query);

    console.log({ rows });

    return {
      products: rows,
      page: page_,
      perPage: perPage_,
      totalPages,
      total
    };
  }
});
