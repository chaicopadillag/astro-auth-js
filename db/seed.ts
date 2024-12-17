import { db, Product, ProductImage, Role, User } from 'astro:db';
import bcript from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { seedProducts } from './seed-data';

export default async function seed() {
  const roles = [
    { id: 'admin', name: 'Admin' },
    { id: 'user', name: 'User' }
  ];

  const users = [
    {
      id: uuid(),
      name: 'Admin',
      email: 'dev.code@gmail.com',
      password: bcript.hashSync('123456'),
      role: 'admin'
    }
  ];

  const queries = [];

  for (const prod of seedProducts) {
    const product = {
      id: uuid(),
      description: prod.description,
      gender: prod.gender,
      price: prod.price,
      sizes: prod.sizes.join(','),
      slug: prod.slug,
      title: prod.title,
      stock: prod.stock,
      tags: prod.tags.join(','),
      type: prod.type,
      createdBy: users[0].id
    };
    queries.push(db.insert(Product).values(product));

    for (const image of prod.images) {
      const productImage = {
        id: uuid(),
        image,
        productId: product.id
      };
      queries.push(db.insert(ProductImage).values(productImage));
    }
  }

  await db.insert(Role).values(roles).execute();
  await db.insert(User).values(users).execute();

  await db.batch(queries as any);
}
