import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const adminHash = await bcrypt.hash('Admin@123', 10);
  const sharedHash = await bcrypt.hash('Pass@1234', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@storerate.com' },
    update: {},
    create: {
      name: 'System Administrator Account',
      email: 'admin@storerate.com',
      password: adminHash,
      address: 'HQ',
      role: 'ADMIN',
    },
  });

  const owner = await prisma.user.upsert({
    where: { email: 'rajesh.owner@storerate.com' },
    update: {},
    create: {
      name: 'Rajesh Kumar Sharma Patel Demo',
      email: 'rajesh.owner@storerate.com',
      password: sharedHash,
      address: 'Shop 12, MG Road, Pune, Maharashtra',
      role: 'OWNER',
    },
  });

  const user = await prisma.user.upsert({
    where: { email: 'sneha.user@storerate.com' },
    update: {},
    create: {
      name: 'Sneha Joshi Patil Deshmukh Demo',
      email: 'sneha.user@storerate.com',
      password: sharedHash,
      address: 'Flat 304, Linking Road, Mumbai, Maharashtra',
      role: 'USER',
    },
  });

  const store = await prisma.store.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Sharma General Store and Mart',
      email: 'sharma.store@storerate.com',
      address: 'Shop 12, MG Road, Pune, Maharashtra',
      ownerId: owner.id,
    },
  });

  await prisma.rating.upsert({
    where: { userId_storeId: { userId: user.id, storeId: store.id } },
    update: {},
    create: { userId: user.id, storeId: store.id, rating: 4 },
  });

  console.log('Seeded users:');
  console.log('  ADMIN  ->', admin.email, '/ Admin@123');
  console.log('  OWNER  ->', owner.email, '/ Pass@1234');
  console.log('  USER   ->', user.email, '/ Pass@1234');
  console.log('Seeded store:', store.name);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
