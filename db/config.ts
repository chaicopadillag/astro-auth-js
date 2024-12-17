import { column, defineDb, defineTable } from 'astro:db';

const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true, unique: true }),
    name: column.text(),
    email: column.text({ unique: true }),
    password: column.text(),
    createdAt: column.date({ default: new Date() }),
    role: column.text({ references: () => Role.columns.id })
  }
});

const Role = defineTable({
  columns: {
    id: column.text({ primaryKey: true, unique: true }),
    name: column.text()
  }
});

const Product = defineTable({
  columns: {
    id: column.text({ primaryKey: true, unique: true }),
    description: column.text(),
    gender: column.text(),
    price: column.number(),
    sizes: column.text(),
    slug: column.text({ unique: true }),
    title: column.text(),
    stock: column.number(),
    tags: column.text(),
    type: column.text(),
    createdAt: column.date({ default: new Date() }),
    updatedAt: column.date({ default: new Date() }),
    createdBy: column.text({ references: () => User.columns.id }),
  }
});

const ProductImage = defineTable({
  columns: {
    id: column.text({ primaryKey: true, unique: true }),
    image: column.text(),
    productId: column.text({ references: () => Product.columns.id }),
  }
});




// https://astro.build/db/config
export default defineDb({
  tables: {
    Role,
    User,
    Product,
    ProductImage
  }
});
