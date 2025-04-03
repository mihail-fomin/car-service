import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

// async function main() {
//     const types = [
//       { name: "Прокачка тормозной жидкости" },
//       { name: "Ротация шин" },
//       { name: "Диагностика двигателя" },
//       { name: "Замена воздушного фильтра" },
//       { name: "Замена масла в двигателе" },
//       { name: "Замена масла в коробке передач" },
//     ];
  
//     for (const type of types) {
//       await prisma.maintenanceType.upsert({
//         where: { name: type.name },
//         update: {},
//         create: type,
//       });
//     }
  
//     console.log("Типы ТО загружены в базу");

//     // Создаем тестового пользователя
//     const user = await prisma.user.upsert({
//       where: { email: "test@example.com" },
//       update: {},
//       create: {
//         email: "test@example.com",
//         name: "Тестовый пользователь",
//         image: "https://avatars.githubusercontent.com/u/1234567",
//       },
//     });

//     // Создаем две машины
//     const cars = [
//       {
//         make: "Toyota",
//         model: "Camry",
//         year: 2020,
//         userId: user.id,
//       },
//       {
//         make: "Honda",
//         model: "Civic",
//         year: 2021,
//         userId: user.id,
//       },
//     ];

//     for (const car of cars) {
//       await prisma.car.upsert({
//         where: { 
//           id: `${car.make}-${car.model}-${car.year}`,
//         },
//         update: {},
//         create: car,
//       });
//     }

//     console.log("Машины загружены в базу");
//   }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
