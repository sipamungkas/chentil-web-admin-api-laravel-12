import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';

interface Island {
    id: number;
    name: string;
    description: string | null;
    provinces: Array<{
        id: number;
        name: string;
        description: string | null;
    }>;
}

interface Props {
    islands: Island[];
}

export default function Index({ islands }: Props) {
    return (
        <>
            <Head title="Islands" />

            <div className="container py-10">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Islands</h2>
                        <p className="text-muted-foreground">
                            Manage islands and their provinces
                        </p>
                    </div>
                    <Link href={route('islands.create')}>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Island
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Islands List</CardTitle>
                        <CardDescription>
                            A list of all islands and their provinces
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DataTable columns={columns} data={islands} />
                    </CardContent>
                </Card>
            </div>
        </>
    );
} 