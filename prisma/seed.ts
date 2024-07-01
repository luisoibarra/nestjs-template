import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  // Seed the DB
  const admin = await prisma.user.upsert({
    where: { email: 'admin@admin.admin' },
    update: {},
    create: {
      email: 'admin@admin.admin',
      userName: 'admin@admin.admin',
      firstName: 'Admin',
      lastName: 'Administrator',
      passwordHash: '',
      emailVerified: true,
    },
  });
  console.log({ admin: admin });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
