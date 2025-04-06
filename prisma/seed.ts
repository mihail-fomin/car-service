import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

// async function seedMaintenanceTypes() {
//   const types = [
//     { name: "Прокачка тормозной жидкости" },
//     { name: "Ротация шин" },
//     { name: "Диагностика двигателя" },
//     { name: "Замена воздушного фильтра" },
//     { name: "Замена масла в двигателе" },
//     { name: "Замена масла в коробке передач" },
//   ];

//   const results = await Promise.all(
//     types.map(type =>
//       prisma.maintenanceType.upsert({
//         where: { name: type.name },
//         update: {},
//         create: type,
//       })
//     )
//   );

//   console.log(`Добавлено ${results.length} типов ТО`);
//   return results;
// }

// async function seedTestUser() {
//   const user = await prisma.user.upsert({
//     where: { email: "test@example.com" },
//     update: {},
//     create: {
//       email: "test@example.com",
//       name: "Тестовый пользователь",
//       image: "https://avatars.githubusercontent.com/u/1234567",
//     },
//   });

//   console.log(`Создан тестовый пользователь: ${user.email}`);
//   return user;
// }

// async function seedTestCars(userId: number) {
//   const cars = [
//     {
//       id: "toyota-camry-2020",
//       make: "Toyota",
//       model: "Camry",
//       year: 2020,
//       userId,
//     },
//     {
//       id: "honda-civic-2021",
//       make: "Honda",
//       model: "Civic",
//       year: 2021,
//       userId,
//     },
//   ];

//   const results = await Promise.all(
//     cars.map(car =>
//       prisma.car.upsert({
//         where: { id: car.id },
//         update: {},
//         create: car,
//       })
//     )
//   );

//   console.log(`Добавлено ${results.length} автомобилей`);
//   return results;
// }

// async function main() {
//   console.log("Начало загрузки данных...");
  
//   try {
//     await seedMaintenanceTypes();
//     const user = await seedTestUser();
//     await seedTestCars(user.id);
    
//     console.log("Данные успешно загружены!");
//   } catch (error) {
//     console.error("Ошибка при загрузке данных:", error);
//     throw error;
//   }
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });