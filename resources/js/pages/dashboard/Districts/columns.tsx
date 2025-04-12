import { Button } from '@/components/ui/button';
import { Column, District } from '@/types';
import { Link, router } from '@inertiajs/react';
import { Edit2, Trash2 } from 'lucide-react';

export const columns: Column<District>[] = [
    {
        accessorKey: 'code',
        header: 'Code',
    },
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'regency.name',
        header: 'Regency',
    },
    {
        accessorKey: 'regency.province.name',
        header: 'Province',
    },
    {
        accessorKey: 'actions',
        header: 'Actions',
        cell: (district) => {
            const handleDelete = () => {
                if (confirm('Are you sure you want to delete this district?')) {
                    router.delete(`/dashboard/districts/${district.id}`);
                }
            };

            return (
                <div className="flex items-center gap-2">
                    <Link href={`/dashboard/districts/${district.id}/edit`}>
                        <Button variant="ghost" size="icon">
                            <Edit2 className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={handleDelete}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            );
        },
    },
]; 