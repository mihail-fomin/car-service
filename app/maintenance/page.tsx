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
    <div>
      {maintenances.map((maintenance) => (
        <div key={maintenance.id}>
          {maintenance.car.make} {maintenance.car.model} - {maintenance.type.name}
        </div>
      ))}
    </div>
  )
}

export default page