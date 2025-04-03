import { useState } from 'react'
import CreateMaintenanceForm from './forms/CreateMaintenanceForm'
import EditMaintenanceForm from './forms/EditMaintenanceForm'
import BaseButton from './ui/BaseButton'
import { Car, Maintenance, MaintenanceType } from '@prisma/client'

type MaintenanceWithRelations = Maintenance & {
  car: Car
  type: MaintenanceType
}

type Props = {
  maintenance: MaintenanceWithRelations[]
}

export default function MaintenanceTable({ maintenance }: Props) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [selectedMaintenance, setSelectedMaintenance] = useState<MaintenanceWithRelations | null>(null)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

    const handleEdit = (maintenance: MaintenanceWithRelations) => {
        setSelectedMaintenance(maintenance)
        setIsEditModalOpen(true)
    }

    const handleCreate = () => {
        setIsCreateModalOpen(true)
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <BaseButton onClick={handleCreate}>
                    Добавить обслуживание
                </BaseButton>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                    {/* ... existing table code ... */}
                </table>
            </div>

            {/* Модальное окно редактирования */}
            {isEditModalOpen && selectedMaintenance && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-2xl p-4">
                        <EditMaintenanceForm
                            maintenance={selectedMaintenance}
                            onClose={() => {
                                setIsEditModalOpen(false)
                                setSelectedMaintenance(null)
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Модальное окно создания */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-2xl p-4">
                        <CreateMaintenanceForm />
                    </div>
                </div>
            )}
        </div>
    )
} 