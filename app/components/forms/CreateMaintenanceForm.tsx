"use client";

import BaseMaintenanceForm from './BaseMaintenanceForm';
import axios from 'axios';

export default function CreateMaintenanceForm() {
  const handleSubmit = async (data: any) => {
    await axios.post('/api/maintenance', {
      ...data,
      price: Number(data.price),
      mileage: Number(data.mileage)
    });
  };

  return (
    <BaseMaintenanceForm
      onSubmit={handleSubmit}
      title="Добавить обслуживание"
      submitButtonText="Добавить"
    />
  );
} 