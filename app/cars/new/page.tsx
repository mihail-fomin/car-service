'use client';

import { CarForm } from '@/app/components/forms/CarForm';

export default function NewCarPage() {
    return (
        <div className="container px-4 py-8 mx-auto w-full">
            <h1 className="mb-6 text-2xl font-bold text-center">Добавить новую машину</h1>
            <CarForm />
        </div>
    );
}
