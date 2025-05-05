import { prisma } from '@/prisma/seed';
import Link from 'next/link';
import BaseButton from '../components/ui/BaseButton';

export default async function CarsPage() {
    const cars = await prisma.car.findMany();
    return (
        <div className="container px-4 py-8 mx-auto">
            <h1 className="mb-4 text-3xl font-bold">Управление машинами</h1>
            <Link href="/cars/new" className="flex justify-end">
                <BaseButton className="mb-4">Добавить машину</BaseButton>
            </Link>
            {cars.map((car) => (
                <div key={car.id}>
                    <h2>
                        {car.make} {car.model} {car.year}
                    </h2>
                </div>
            ))}
        </div>
    );
}
