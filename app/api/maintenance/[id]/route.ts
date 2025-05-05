import { prisma } from '@/prisma/seed';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const body = await req.json();
        const { carId, mileage, date, typeId, note, price } = body;
        const { id } = await params;
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
            },
        });

        return NextResponse.json(maintenance);
    } catch (error) {
        console.error('Ошибка при обновлении записи об обслуживании:', error);
        return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;

        await prisma.maintenance.delete({
            where: {
                id,
            },
        });

        return NextResponse.json({ message: 'Запись об обслуживании удалена' }, { status: 200 });
    } catch (error) {
        console.error('Ошибка при удалении записи об обслуживании:', error);
        return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
    }
}
