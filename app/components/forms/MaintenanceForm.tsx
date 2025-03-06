"use client";

import { useFieldArray, useForm } from "react-hook-form";
import BaseButton from "../ui/BaseButton";
import { useEffect, useState } from "react";

type Work = {
    name: string;
    price: number;
  };
  
  type MaintenanceType = {
    id: string;
    name: string;
  };
  
  type MaintenanceFormData = {
    mileage: number;
    date: string;
    typeId: string;
    note?: string;
    works: Work[];
  };

export default function MaintenanceForm() {
    const [types, setTypes] = useState<MaintenanceType[]>([]);

    useEffect(() => {
        fetch("/api/maintenance-types")
          .then((res) => res.json())
          .then(setTypes)
          .catch((err) => console.error("Ошибка загрузки типов:", err));
      }, []);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
      } = useForm<MaintenanceFormData>({
        defaultValues: {
          works: [{ name: "", price: 0 }],
        },
      });

      const { fields, append, remove } = useFieldArray({
        control,
        name: "works",
      });

  const onSubmit = (data: MaintenanceFormData) => {
    console.log("Maintenance Data:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto bg-gray-900 p-6 rounded-2xl shadow-lg space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-200">Добавить обслуживание</h2>

      {/* Пробег */}
      <div>
        <label className="block text-sm font-medium text-gray-300">Пробег (км)</label>
        <input
          type="number"
          {...register("mileage", { required: "Введите пробег", min: 0 })}
          className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-gray-200 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
        />
        {errors.mileage && <p className="text-red-400 text-sm">{errors.mileage.message}</p>}
      </div>

      {/* Дата */}
      <div>
        <label className="block text-sm font-medium text-gray-300">Дата обслуживания</label>
        <input
          type="date"
          {...register("date", { required: "Выберите дату" })}
          className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-gray-200 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
        />
        {errors.date && <p className="text-red-400 text-sm">{errors.date.message}</p>}
      </div>

      {/* Тип обслуживания */}
      <div>
        <label className="block text-sm font-medium text-gray-300">Тип обслуживания</label>
        <select
          {...register("typeId", { required: "Выберите тип обслуживания" })}
          className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-gray-200 p-2"
        >
          <option value="">Выберите...</option>
          {types.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
        {errors.typeId && <p className="text-red-400 text-sm">{errors.typeId.message}</p>}
      </div>

            {/* Список выполненных работ */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Выполненные работы</label>
        {fields.map((item, index) => (
          <div key={item.id} className="flex space-x-2">
            <input
              {...register(`works.${index}.name`, { required: "Введите название работы" })}
              placeholder="Название"
              className="w-2/3 p-2 rounded-md bg-gray-800 border-gray-700 text-gray-200"
            />
            <input
              type="number"
              step="0.01"
              {...register(`works.${index}.price`, { required: "Введите цену", min: 0 })}
              placeholder="Цена"
              className="w-1/3 p-2 rounded-md bg-gray-800 border-gray-700 text-gray-200"
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-red-400 hover:text-red-500"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => append({ name: "", price: 0 })}
          className="mt-2 text-indigo-400 hover:text-indigo-500"
        >
          + Добавить работу
        </button>
      </div>

      {/* Заметки */}
      <div>
        <label className="block text-sm font-medium text-gray-300">Заметка (необязательно)</label>
        <textarea
          {...register("note")}
          className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-gray-200 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
          rows={3}
        ></textarea>
      </div>

      {/* Кнопка */}
      <BaseButton
        className="w-full"
        type="submit"
    >
        Сохранить
      </BaseButton>
    </form>
  );
}
