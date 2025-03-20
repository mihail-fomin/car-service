"use client";

import { useFieldArray, useForm } from "react-hook-form";
import BaseButton from "../ui/BaseButton";
import { useEffect, useState, useRef } from "react";
import SelectMenu from "../ui/SelectMenu";

export type Work = {
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
  const [works, setWorks] = useState<Work[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const [formWidth, setFormWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (formRef.current) {
        // Отнимаем padding (p-6 = 1.5rem * 2 = 3rem = 48px)
        const paddingWidth = 48;
        const actualWidth = formRef.current.offsetWidth - paddingWidth;
        setFormWidth(actualWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

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
      ref={formRef}
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg p-6 mx-auto space-y-4 bg-gray-900 shadow-lg rounded-2xl"
    >
      <h2 className="text-xl font-semibold text-gray-200">
        Добавить обслуживание
      </h2>

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

      {/* Список выполненных работ */}
      <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Тип обслуживания</label>
          {fields.map((item, index) => (
            <div key={item.id}>
              <div className="flex space-x-2 mt-2">
                <SelectMenu fields={types} containerWidth={formWidth} />
                {errors.typeId && (
                  <p className="text-sm text-red-400">{errors.typeId.message}</p>
                )}
                <input
                  type="number"
                  step="0.01"
                  {...register(`works.${index}.price`, {
                    required: "Введите цену",
                    min: 0,
                  })}
                  placeholder="Цена"
                  className="w-1/3 p-2 text-gray-200 bg-gray-800 border-gray-700 rounded-md"
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-400 hover:text-red-500"
                >
                  ✕
                </button>
              </div>
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
