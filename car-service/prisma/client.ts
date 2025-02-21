import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Создание пользователя
  const user = await prisma.user.create({
    data: {
      email: 'user@example.com',
      password: 'securepassword123', // Обычно пароль нужно хешировать
    },
  });

  // Создание автомобиля, привязанного к пользователю
  const car = await prisma.car.create({
    data: {
      make: 'Kia',
      model: 'K5',
      year: 2020,
      userId: user.id, // Привязка к пользователю
    },
  });

  console.log({ user, car });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
