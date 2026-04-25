import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const adminHash = await bcrypt.hash('Admin@123', 10);
  const ownerHash = await bcrypt.hash('Owner@123', 10);
  const userHash = await bcrypt.hash('User@1234', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@storerate.pro' },
    update: {},
    create: {
      name: 'System Administrator Account',
      email: 'admin@storerate.pro',
      password: adminHash,
      address: 'HQ',
      role: 'ADMIN',
    },
  });

  const owner = await prisma.user.upsert({
    where: { email: 'owner@storerate.pro' },
    update: {},
    create: {
      name: 'Default Store Owner Account User',
      email: 'owner@storerate.pro',
      password: ownerHash,
      address: 'Owner Street, Demo City, State',
      role: 'OWNER',
    },
  });

  const user = await prisma.user.upsert({
    where: { email: 'user@storerate.pro' },
    update: {},
    create: {
      name: 'Default Normal Customer Account User',
      email: 'user@storerate.pro',
      password: userHash,
      address: 'Customer Street, Demo City, State',
      role: 'USER',
    },
  });

  await prisma.store.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Default Demonstration Store Number One',
      email: 'store1@storerate.pro',
      address: 'Market Road, Demo City, State',
      ownerId: owner.id,
    },
  });

  console.log('Seeded users:');
  console.log('  ADMIN  ->', admin.email, '/ Admin@123');
  console.log('  OWNER  ->', owner.email, '/ Owner@123');
  console.log('  USER   ->', user.email, '/ User@1234');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
