import React from 'react'
import { Maintenance, Car, MaintenanceType } from '@prisma/client'

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
  return (
    <div className="container mx-auto px-4 py-8">
      <table className="min-w-full bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-800">
            {columns.map((column) => (
              <th 
                key={column.header}
                className="py-3 px-4 border-b border-gray-700 text-left text-gray-300"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {maintenances.map((maintenance) => (
            <tr key={maintenance.id} className="hover:bg-gray-800 transition-colors">
              {columns.map((column) => (
                <td 
                  key={`${maintenance.id}-${column.header}`}
                  className="py-3 px-4 border-b border-gray-700 text-gray-300"
                >
                  {column.accessor(maintenance)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 