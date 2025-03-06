import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

async function main() {
    const types = [
      { name: "Прокачка тормозной жидкости" },
      { name: "Ротация шин" },
      { name: "Диагностика двигателя" },
      { name: "Замена воздушного фильтра" },
      { name: "Замена масла в двигателе" },
      { name: "Замена масла в коробке передач" },
    ];
  
    for (const type of types) {
      await prisma.maintenanceType.upsert({
        where: { name: type.name },
        update: {},
        create: type,
      });
    }
  
    console.log("Типы ТО загружены в базу");
  }

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
