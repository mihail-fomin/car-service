import EditMaintenanceForm from '@/app/components/forms/EditMaintenanceForm'
import { prisma } from '@/prisma/seed'
import { notFound } from 'next/navigation'

type Props = {
    params: {
        id: string
    }
}

const page = async (props: Props) => {
    const id = props.params.id

    const maintenance = await prisma.maintenance.findUnique({
        where: {
            id: id
        },
        include: {
            car: true,
            type: true
        }
    })

    if (!maintenance) {
        notFound()
    }

    return <EditMaintenanceForm maintenance={maintenance} onClose={() => {}} />
}

export default page