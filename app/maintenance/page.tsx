import { prisma } from '@/prisma/seed'
import MaintenanceTable from '@/app/components/tables/MaintenanceTable'

type Props = {}

const page = async (props: Props) => {
    const maintenances = await prisma.maintenance.findMany({
        include: {
            car: true,
            type: true
        }
    })

    return <MaintenanceTable maintenances={maintenances} />
}

export default page