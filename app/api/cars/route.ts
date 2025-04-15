import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/prisma/seed'
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';
 
export async function GET(req: NextRequest) {
    try {
        const cars = await prisma.car.findMany()
        return NextResponse.json(cars)
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Unknown error occurred');
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
    
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
    
        const userId = session.user.id;

        const body = await req.json();

        const { make, model, year } = body;
        const car = await prisma.car.create({ data: { userId, make, model, year: parseInt(year) } })


        return NextResponse.json(car)
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Unknown error occurred');
    }
}