import { prisma } from '@/prisma/seed';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { carId, mileage, date, typeId, note, price } = body;

    // Проверка обязательных полей
    if (!carId || !mileage || !date || !typeId) {
      return NextResponse.json({ error: 'Отсутствуют обязательные поля' }, { status: 400 });
    }

    // Создание записи об обслуживании

    
    const maintenance = await prisma.maintenance.create({
      data: {
        carId,
        mileage: Number(mileage),
        date: new Date(date),
        typeId,
        note,
        price: price ? Number(price) : null,
      }
    });

    return NextResponse.json(maintenance, { status: 201 });
  } catch (error) {
    console.error('Ошибка при создании записи об обслуживании:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const maintenances = await prisma.maintenance.findMany({
      include: {
        car: true,
        type: true
      }
    });
    
    return NextResponse.json(maintenances);
  } catch (error) {
    console.error('Ошибка при получении записей об обслуживании:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
