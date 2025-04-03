import { prisma } from '@/prisma/seed'
import React from 'react'

type Props = {}

const page = async (props: Props) => {
    const maintenances = await prisma.maintenance.findMany({
        include: {
            car: true,
            type: true
        }
    })

  return (
    <div className="container mx-auto px-4 py-8">
      <table className="min-w-full bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-800">
            <th className="py-3 px-4 border-b border-gray-700 text-left text-gray-300">Дата</th>
            <th className="py-3 px-4 border-b border-gray-700 text-left text-gray-300">Автомобиль</th>
            <th className="py-3 px-4 border-b border-gray-700 text-left text-gray-300">Тип обслуживания</th>
            <th className="py-3 px-4 border-b border-gray-700 text-left text-gray-300">Пробег (км)</th>
            <th className="py-3 px-4 border-b border-gray-700 text-left text-gray-300">Цена (₽)</th>
            <th className="py-3 px-4 border-b border-gray-700 text-left text-gray-300">Заметка</th>
          </tr>
        </thead>
        <tbody>
          {maintenances.map((maintenance) => (
            <tr key={maintenance.id} className="hover:bg-gray-800 transition-colors">
              <td className="py-3 px-4 border-b border-gray-700 text-gray-300">
                {new Date(maintenance.date).toLocaleDateString('ru-RU')}
              </td>
              <td className="py-3 px-4 border-b border-gray-700 text-gray-300">
                {maintenance.car.make} {maintenance.car.model} ({maintenance.car.year})
              </td>
              <td className="py-3 px-4 border-b border-gray-700 text-gray-300">
                {maintenance.type.name}
              </td>
              <td className="py-3 px-4 border-b border-gray-700 text-gray-300">
                {maintenance.mileage.toLocaleString('ru-RU')}
              </td>
              <td className="py-3 px-4 border-b border-gray-700 text-gray-300">
                {maintenance.price ? maintenance.price.toLocaleString('ru-RU') : '-'}
              </td>
              <td className="py-3 px-4 border-b border-gray-700 text-gray-300">
                {maintenance.note || '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default page