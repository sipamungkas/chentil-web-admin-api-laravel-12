import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { columns } from './columns';

interface Island {
    id: number;
    name: string;
    description: string | null;
}

interface Province {
    id: number;
    name: string;
    description: string | null;
    island_id: number | null;
    island?: Island;
}

interface Props {
    island?: Island;
    provinces: {
        data: Province[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
}

export default function Index({ island, provinces }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Islands',
            href: '/dashboard/provinces-menu',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Islands" />

            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">{island ? `Provinces in ${island.name}` : 'All Provinces'}</h2>
                        <p className="text-muted-foreground">{island ? 'Manage provinces in this island' : 'Manage all provinces'}</p>
                    </div>
                    <Link href={island ? route('dashboard.islands.provinces.create', island.id) : route('dashboard.provinces-menu.create')}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Province
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Provinces List</CardTitle>
                        <CardDescription>{island ? `A list of all provinces in ${island.name}` : 'A list of all provinces'}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DataTable
                            columns={columns}
                            data={provinces.data}
                            pagination={{
                                currentPage: provinces.current_page,
                                lastPage: provinces.last_page,
                                perPage: provinces.per_page,
                                total: provinces.total,
                                from: provinces.from,
                                to: provinces.to,
                            }}
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
