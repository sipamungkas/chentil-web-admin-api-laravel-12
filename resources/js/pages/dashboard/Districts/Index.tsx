import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, District } from '@/types';
import { columns } from './columns';

interface Props {
    districts: {
        data: District[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
}

export default function DistrictsIndex({ districts }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Districts',
            href: '/dashboard/districts',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Districts" />

            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Districts</h2>
                        <p className="text-muted-foreground">Manage districts in the system</p>
                    </div>
                    <Link href={route('dashboard.districts.create')}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add District
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Districts List</CardTitle>
                        <CardDescription>A list of all districts in the system</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DataTable
                            columns={columns}
                            data={districts.data}
                            pagination={{
                                currentPage: districts.current_page,
                                lastPage: districts.last_page,
                                perPage: districts.per_page,
                                total: districts.total,
                                from: districts.from,
                                to: districts.to,
                            }}
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
