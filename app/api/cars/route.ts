import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/prisma/seed'
import { NextResponse } from 'next/server'
 
export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const cars = await prisma.car.findMany()

    return NextResponse.json(cars)
}