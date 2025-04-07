"use client";

import { useForm } from "react-hook-form";
import BaseButton from "../ui/BaseButton";
import { useEffect, useState } from "react";
import SelectMenu from "../ui/SelectMenu";
import axios from "axios";
import { Car, Maintenance, MaintenanceType } from "@prisma/client";
import { useRouter } from "next/navigation";

export type MaintenanceWithRelations = Maintenance & {
  car: Car
  type: MaintenanceType
}

type MaintenanceFormData = {
  carId: string;
  date: string;
  mileage: number;
  note?: string;
  price: number;
  typeId: string;
};

type BaseMaintenanceFormProps = {
  maintenance?: MaintenanceWithRelations;
  onClose?: () => void;
  onSubmit: (data: MaintenanceFormData) => Promise<void>;
  title: string;
  submitButtonText: string;
}

export default function BaseMaintenanceForm({ 
  maintenance, 
  onClose, 
  onSubmit,
  title,
  submitButtonText
}: BaseMaintenanceFormProps) {
  const [types, setTypes] = useState<MaintenanceType[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    axios.get("/api/maintenance-types")
      .then((res) => setTypes(res.data))
      .catch((err) => console.error("Ошибка загрузки типов:", err));

    axios.get("/api/cars")
      .then((res) => setCars(res.data))
      .catch((err) => console.error("Ошибка загрузки автомобилей:", err));
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<MaintenanceFormData>({
    defaultValues: maintenance ? {
      carId: maintenance.carId,
      date: new Date(maintenance.date).toISOString().split('T')[0],
      mileage: maintenance.mileage,
      note: maintenance.note || '',
      price: maintenance.price || 0,
      typeId: maintenance.typeId
    } : {
      date: new Date().toISOString().split('T')[0],
      price: 0
    },
  });

  useEffect(() => {
    if (maintenance) {
      setValue('carId', maintenance.carId)
      setValue('typeId', maintenance.typeId)
    }
  }, [maintenance, setValue])

  const handleFormSubmit = async (data: MaintenanceFormData) => {
    try {
      setIsLoading(true);
      await onSubmit(data);
      setIsLoading(false);
      router.push('/maintenance');
      if (onClose) onClose();
    } catch (err) {
      setIsLoading(false);
      console.error("Ошибка при сохранении обслуживания:", err);
    }
  };

  const carLabel = `${maintenance?.car.make} ${maintenance?.car.model} ${maintenance?.car.year}`

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="max-w-lg p-6 mx-auto space-y-4 bg-gray-900 shadow-lg rounded-2xl"
    >
      <h2 className="text-xl font-semibold text-gray-200">
        {title}
      </h2>

      {/* Автомобиль */}
      <label className="block text-sm font-medium text-gray-300">
        Автомобиль
      </label>
      <SelectMenu
        options={cars.map(car => ({
          id: car.id,
          label: `${car.make} ${car.model} ${car.year}`
        }))}
        name="carId"
        setValue={setValue}
        defaultValue={maintenance && {id: maintenance?.carId, label: carLabel}}
      />
      {errors.carId && (
        <p className="text-sm text-red-400">{errors.carId.message}</p>
      )}

      {/* Тип обслуживания */}
      <div>
        <label className="block text-sm font-medium text-gray-300">
          Тип обслуживания
        </label>
        <SelectMenu
          options={types.map(type => ({
            id: type.id,
            label: type.name
          }))}
          name="typeId"
          setValue={setValue}
          defaultValue={maintenance && {id: maintenance?.typeId, label: maintenance?.type.name}}
        />
        {errors.typeId && (
          <p className="text-sm text-red-400">{errors.typeId.message}</p>
        )}
      </div>

      {/* Пробег */}
      <div>
        <label className="block text-sm font-medium text-gray-300">
          Пробег (км)
        </label>
        <input
          type="number"
          {...register("mileage", { required: "Введите пробег", min: 0 })}
          className="block w-full p-2 mt-1 text-gray-200 bg-gray-800 border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.mileage && (
          <p className="text-sm text-red-400">{errors.mileage.message}</p>
        )}
      </div>

      {/* Дата */}
      <div>
        <label className="block text-sm font-medium text-gray-300">
          Дата обслуживания
        </label>
        <input
          type="date"
          {...register("date", { required: "Выберите дату" })}
          className="block w-full p-2 mt-1 text-gray-200 bg-gray-800 border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.date && (
          <p className="text-sm text-red-400">{errors.date.message}</p>
        )}
      </div>

      {/* Цена */}
      <div>
        <label className="block text-sm font-medium text-gray-300">
          Цена
        </label>
        <input
          type="number"
          step="0.01"
          {...register("price", {
            required: "Введите цену",
          })}
          className="block w-full p-2 mt-1 text-gray-200 bg-gray-800 border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.price && (
          <p className="text-sm text-red-400">{errors.price.message}</p>
        )}
      </div>

      {/* Заметки */}
      <div>
        <label className="block text-sm font-medium text-gray-300">
          Заметка (необязательно)
        </label>
        <textarea
          {...register("note")}
          className="block w-full p-2 mt-1 text-gray-200 bg-gray-800 border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          rows={3}
        ></textarea>
      </div>

      <div className="flex gap-4">
        <BaseButton className="flex-1" type="submit" disabled={isLoading}>
          {isLoading ? "Сохранение..." : submitButtonText}
        </BaseButton>
        {onClose && (
          <BaseButton 
            className="flex-1 bg-gray-700 hover:bg-gray-600" 
            type="button" 
            onClick={onClose}
          >
            Отмена
          </BaseButton>
        )}
      </div>
    </form>
  );
} 