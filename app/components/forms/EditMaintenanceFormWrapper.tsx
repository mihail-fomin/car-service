'use client'

import { useRouter } from 'next/navigation'
import EditMaintenanceForm from './EditMaintenanceForm'
import { Maintenance, Car, MaintenanceType } from '@prisma/client'

type MaintenanceWithRelations = Maintenance & {
  car: Car
  type: MaintenanceType
}

type Props = {
  maintenance: MaintenanceWithRelations
}

export default function EditMaintenanceFormWrapper({ maintenance }: Props) {
  const router = useRouter()

  return (
    <EditMaintenanceForm 
      maintenance={maintenance} 
      onClose={() => router.push('/maintenance')} 
    />
  )
} 