'use client'

import React, { useState } from 'react'
import { Maintenance, Car, MaintenanceType } from '@prisma/client'
import EditMaintenanceForm from '../forms/EditMaintenanceForm'

type MaintenanceWithRelations = Maintenance & {
  car: Car
  type: MaintenanceType
}

type Column = {
  header: string
  accessor: (maintenance: MaintenanceWithRelations) => React.ReactNode
}

const columns: Column[] = [
  {
    header: 'Дата',
    accessor: (maintenance) => new Date(maintenance.date).toLocaleDateString('ru-RU')
  },
  {
    header: 'Автомобиль',
    accessor: (maintenance) => `${maintenance.car.make} ${maintenance.car.model} (${maintenance.car.year})`
  },
  {
    header: 'Тип обслуживания',
    accessor: (maintenance) => maintenance.type.name
  },
  {
    header: 'Пробег (км)',
    accessor: (maintenance) => maintenance.mileage.toLocaleString('ru-RU')
  },
  {
    header: 'Цена (₽)',
    accessor: (maintenance) => maintenance.price ? maintenance.price.toLocaleString('ru-RU') : '-'
  },
  {
    header: 'Заметка',
    accessor: (maintenance) => maintenance.note || '-'
  }
]

type MaintenanceTableProps = {
  maintenances: MaintenanceWithRelations[]
}

export default function MaintenanceTable({ maintenances }: MaintenanceTableProps) {
  const [selectedMaintenance, setSelectedMaintenance] = useState<MaintenanceWithRelations | null>(null)

  return (
    <div className="container px-4 py-8 mx-auto rounded-lg sm:px-6 lg:px-8 dark:bg-gray-900">
      <div className="overflow-x-auto">
        <table className="min-w-full overflow-hidden rounded-lg">
          <thead>
            <tr className="bg-gray-800">
              {columns.map((column) => (
                <th 
                  key={column.header}
                  className="px-4 py-3 text-left text-gray-300 border-b border-gray-700"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {maintenances.map((maintenance) => (
              <tr 
                key={maintenance.id} 
                className="transition-colors cursor-pointer hover:bg-gray-800"
                onClick={() => setSelectedMaintenance(maintenance)}
              >
                {columns.map((column) => (
                  <td 
                    key={`${maintenance.id}-${column.header}`}
                    className="px-4 py-3 text-gray-300 border-b border-gray-700"
                  >
                    {column.accessor(maintenance)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedMaintenance && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedMaintenance(null);
            }
          }}
        >
          <div className="w-full max-w-2xl">
            <EditMaintenanceForm 
              maintenance={selectedMaintenance}
              onClose={() => setSelectedMaintenance(null)}
            />
          </div>
        </div>
      )}
    </div>
  )
} 