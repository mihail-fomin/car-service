import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/prisma/seed'
 
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
        const body = await req.json();
        const { userId, make, model, year } = body;
        const car = await prisma.car.create({ data: { userId, make, model, year } })
        return NextResponse.json(car)
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Unknown error occurred');
    }
}