"use client";

import { useForm } from "react-hook-form";
import BaseButton from "../ui/BaseButton";
import { useEffect, useState } from "react";
import SelectMenu from "../ui/SelectMenu";
import axios from "axios";
import { Car, Maintenance, MaintenanceType } from "@prisma/client";
import { useRouter } from "next/navigation";
import ConfirmDialog from "../ui/ConfirmDialog";

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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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
    mode: "onChange",
    resolver: (values) => {
      const errors: any = {};
      if (!values.typeId) {
        errors.typeId = { message: "Выберите тип обслуживания" };
      }
      return { values, errors };
    }
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


  const confirmDelete = async () => {
    try {
      await axios.delete(`/api/maintenance/${maintenance?.id}`);
      router.push('/maintenance');
      if (onClose) onClose();
    } catch (error) {
      console.error('Ошибка при удалении:', error);
    }
  };

  const carLabel = `${maintenance?.car.make} ${maintenance?.car.model} ${maintenance?.car.year}`

  return (
    <>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="max-w-lg p-6 mx-auto space-y-4 bg-gray-900 shadow-lg rounded-2xl"
      >
        <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-200">
          {title}
        </h2>
        {
            maintenance && (
                <button
                    type="button"
                    onClick={() => setIsDeleteModalOpen(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
                </button>
            )
        }
        </div>
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
            <p className="text-sm text-red-400">{errors.typeId.message || "Выберите тип обслуживания"}</p>
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

      <ConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)} // не закрываем специально
        onConfirm={confirmDelete}
        title="Подтверждение удаления"
        description="Вы уверены, что хотите удалить это обслуживание?"
      />
    </>
  );
} 