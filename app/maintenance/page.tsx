import { prisma } from '@/prisma/seed';
import MaintenanceTable from '@/app/components/tables/MaintenanceTable';

const page = async () => {
    const maintenances = await prisma.maintenance.findMany({
        include: {
            car: true,
            type: true,
        },
    });

    return <MaintenanceTable maintenances={maintenances} />;
};

export default page;
