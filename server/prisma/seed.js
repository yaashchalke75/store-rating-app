import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash('Admin@123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@storerate.pro' },
    update: {},
    create: {
      name: 'System Administrator Account',
      email: 'admin@storerate.pro',
      password: hash,
      address: 'HQ',
      role: 'ADMIN',
    },
  });

  console.log('Seeded admin:', admin.email, '/ password: Admin@123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
