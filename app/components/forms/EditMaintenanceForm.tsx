'use client';

import BaseMaintenanceForm from './BaseMaintenanceForm';
import axios from 'axios';
import { MaintenanceWithRelations } from './BaseMaintenanceForm';

type Props = {
    maintenance: MaintenanceWithRelations;
    onClose: () => void;
};

export default function EditMaintenanceForm({ maintenance, onClose }: Props) {
    const handleSubmit = async (data: any) => {
        await axios.put(`/api/maintenance/${maintenance.id}`, {
            ...data,
            price: Number(data.price),
            mileage: Number(data.mileage),
        });
    };

    return (
        <BaseMaintenanceForm
            maintenance={maintenance}
            onClose={onClose}
            onSubmit={handleSubmit}
            title="Редактировать обслуживание"
            submitButtonText="Сохранить"
        />
    );
}
