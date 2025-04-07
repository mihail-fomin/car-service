import { prisma } from '@/prisma/seed';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { carId, mileage, date, typeId, note, price } = body;
    const { id } = await params
    // Проверка обязательных полей
    if (!carId || !mileage || !date || !typeId) {
      return NextResponse.json({ error: 'Отсутствуют обязательные поля' }, { status: 400 });
    }

    // Обновление записи об обслуживании
    const maintenance = await prisma.maintenance.update({
      where: {
        id,
      },
      data: {
        carId,
        mileage: Number(mileage),
        date: new Date(date),
        typeId,
        note,
        price: price ? Number(price) : null,
      }
    });

    return NextResponse.json(maintenance);
  } catch (error) {
    console.error('Ошибка при обновлении записи об обслуживании:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
} 