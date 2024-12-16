import { db, Role, User } from 'astro:db';
import bcript from 'bcryptjs';
import { v4 as uuid } from 'uuid';

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

  await db.insert(Role).values(roles).execute();
  await db.insert(User).values(users).execute();
}
