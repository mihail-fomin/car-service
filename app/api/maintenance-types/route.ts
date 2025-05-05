import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/prisma/seed';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const types = await prisma.maintenanceType.findMany();

    return NextResponse.json(types);
}
