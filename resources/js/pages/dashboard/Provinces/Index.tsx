import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
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
    return (
        <>
            <Head title={island ? `Provinces - ${island.name}` : 'All Provinces'} />

            <div className="container py-10">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">
                            {island ? `Provinces in ${island.name}` : 'All Provinces'}
                        </h2>
                        <p className="text-muted-foreground">
                            {island ? 'Manage provinces in this island' : 'Manage all provinces'}
                        </p>
                    </div>
                    <Link href={island ? route('dashboard.islands.provinces.create', island.id) : route('dashboard.provinces.create')}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Province
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Provinces List</CardTitle>
                        <CardDescription>
                            {island ? `A list of all provinces in ${island.name}` : 'A list of all provinces'}
                        </CardDescription>
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
                                to: provinces.to
                            }}
                        />
                    </CardContent>
                </Card>
            </div>
        </>
    );
} 