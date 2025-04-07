import { prisma } from '@/prisma/seed';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    console.log('session?.user: ', session?.user);
    
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Проверяем существование пользователя в базе данных
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    });

    if (!user) {
      return NextResponse.json({ error: 'Пользователь не найден' }, { status: 404 });
    }

    const body = await req.json();
    const { carId, mileage, date, typeId, note, price } = body;
    console.log('body: ', body);

    // Проверка обязательных полей
    if (!carId || !mileage || !date || !typeId) {
      return NextResponse.json({ error: 'Отсутствуют обязательные поля' }, { status: 400 });
    }

    console.log('Создание записи с данными:', {
      carId,
      mileage: Number(mileage),
      date: new Date(date),
      typeId,
      note,
      price: price ? Number(price) : null,
      userId: session.user.id,
    });

    // Создание записи об обслуживании
    const maintenance = await prisma.maintenance.create({
      data: {
        carId,
        mileage: Number(mileage),
        date: new Date(date),
        typeId,
        note,
        price: price ? Number(price) : null,
        userId: session.user.id,
      }
    });

    console.log('Запись создана:', maintenance);

    return NextResponse.json(maintenance, { status: 201 });
  } catch (error: any) {
    console.error('Ошибка при создании записи об обслуживании:', error);
    return NextResponse.json({ 
      error: 'Ошибка сервера', 
      details: error?.message || 'Неизвестная ошибка'
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const maintenances = await prisma.maintenance.findMany({
      include: {
        car: true,
        type: true
      },
      orderBy: {
        date: 'desc'
      },
      where: {
        userId: session.user.id
      }
    });
    
    return NextResponse.json(maintenances);
  } catch (error) {
    console.error('Ошибка при получении записей об обслуживании:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
