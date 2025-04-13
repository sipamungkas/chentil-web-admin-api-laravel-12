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
    image: string | null;
    provinces_count: number;
}

interface Props {
    islands: {
        data: Island[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
}

export default function Index({ islands }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Islands',
            href: '/dashboard/islands',
        },
        {
            title: 'Edit',
            href: '/dashboard/islands/edit',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Islands" />

            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Islands</h1>
                    <Link href={route('dashboard.islands.create')}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Island
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Islands List</CardTitle>
                        <CardDescription>A list of all islands</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DataTable
                            columns={columns}
                            data={islands.data}
                            pagination={{
                                currentPage: islands.current_page,
                                lastPage: islands.last_page,
                                perPage: islands.per_page,
                                total: islands.total,
                                from: islands.from,
                                to: islands.to,
                            }}
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
