'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import BaseButton from '@/app/components/ui/BaseButton';

export function CarForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        make: '',
        model: '',
        year: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/cars', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Ошибка при создании машины');
            }

            router.push('/cars');
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при создании машины');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md space-y-4">
            <div className="space-y-2">
                <Label htmlFor="make">Марка</Label>
                <Input
                    id="make"
                    name="make"
                    value={formData.make}
                    onChange={handleChange}
                    required
                    placeholder="Например: Toyota"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="model">Модель</Label>
                <Input
                    id="model"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    required
                    placeholder="Например: Camry"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="year">Год выпуска</Label>
                <Input
                    id="year"
                    name="year"
                    type="number"
                    value={formData.year}
                    onChange={handleChange}
                    required
                    placeholder="Например: 2020"
                    min="1900"
                    max={new Date().getFullYear()}
                />
            </div>
            <BaseButton type="submit" className="w-full">
                Добавить машину
            </BaseButton>
        </form>
    );
} 