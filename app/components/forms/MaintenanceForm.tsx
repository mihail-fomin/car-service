"use client";

import { useForm } from "react-hook-form";
import BaseButton from "../ui/BaseButton";
import { useEffect, useState } from "react";
import SelectMenu from "../ui/SelectMenu";
import axios from "axios";
import { Car, Maintenance } from "@prisma/client";

type MaintenanceType = {
  id: string;
  name: string;
};

type MaintenanceFormData = {
  carId: string;
  mileage: number;
  date: string;
  typeId: string;
  note?: string;
  price: number;
};

export default function MaintenanceForm() {
  const [types, setTypes] = useState<MaintenanceType[]>([]);
  const [cars, setCars] = useState<Car[]>([]);

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
    defaultValues: {
      price: 0,
    },
  });

  const onSubmit = (data: MaintenanceFormData) => {
    console.log('data: ', data);
    axios.post<Maintenance>('/api/maintenance', {
      ...data,
      price: Number(data.price),
      mileage: Number(data.mileage)
    })
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg p-6 mx-auto space-y-4 bg-gray-900 shadow-lg rounded-2xl"
    >
      <h2 className="text-xl font-semibold text-gray-200">
        Добавить обслуживание
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

      {/* Кнопка */}
      <BaseButton className="w-full" type="submit">
        Сохранить
      </BaseButton>
    </form>
  );
}
