import { Head, Link, router } from '@inertiajs/react';
import { Plus, Search } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Regency } from '@/types';
import { columns } from './columns';

interface Props {
    regencies: {
        data: Regency[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
    filters: {
        search: string;
    };
}

export default function RegenciesIndex({ regencies, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');

    const debouncedSearch = useCallback(
        debounce((value: string) => {
            router.get(
                '/dashboard/regencies',
                { search: value },
                {
                    preserveState: true,
                    preserveScroll: true,
                },
            );
        }, 300),
        [],
    );

    useEffect(() => {
        debouncedSearch(search);
        return () => debouncedSearch.cancel();
    }, [search, debouncedSearch]);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Regencies',
            href: '/dashboard/regencies',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Regencies" />

            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Regencies</h2>
                        <p className="text-muted-foreground">Manage regencies in the system</p>
                    </div>
                    <Link href={route('dashboard.regencies.create')}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Regency
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Regencies List</CardTitle>
                        <CardDescription>A list of all regencies in the system</CardDescription>
                        <div className="mt-4 flex w-full max-w-sm items-center space-x-2">
                            <Search className="h-4 w-4 text-gray-500" />
                            <Input
                                placeholder="Search regencies..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="h-8"
                            />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <DataTable
                            columns={columns}
                            data={regencies.data}
                            pagination={{
                                currentPage: regencies.current_page,
                                lastPage: regencies.last_page,
                                perPage: regencies.per_page,
                                total: regencies.total,
                                from: regencies.from,
                                to: regencies.to,
                            }}
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
} 