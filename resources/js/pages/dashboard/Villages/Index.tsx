import { Head, Link, router } from '@inertiajs/react';
import { Plus, Search } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash/debounce';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Village } from '@/types';
import { columns } from './columns';

interface Props {
    villages: {
        data: Village[];
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

export default function Index({ villages, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');

    const debouncedSearch = useCallback(
        debounce((value: string) => {
            router.get(
                '/dashboard/villages',
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
            title: 'Villages',
            href: '/dashboard/villages',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Villages" />

            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Villages</h2>
                        <p className="text-muted-foreground">Manage villages in the system</p>
                    </div>
                    <Link href="/dashboard/villages/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Village
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Villages List</CardTitle>
                        <CardDescription>A list of all villages in the system</CardDescription>
                        <div className="mt-4 flex w-full max-w-sm items-center space-x-2">
                            <Search className="h-4 w-4 text-gray-500" />
                            <Input
                                placeholder="Search villages..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="h-8"
                            />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <DataTable<Village>
                            columns={columns}
                            data={villages.data}
                            pagination={{
                                currentPage: villages.current_page,
                                lastPage: villages.last_page,
                                perPage: villages.per_page,
                                total: villages.total,
                                from: villages.from,
                                to: villages.to,
                            }}
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
} 