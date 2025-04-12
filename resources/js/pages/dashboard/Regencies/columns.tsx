import { Button } from '@/components/ui/button';
import { Column, Regency } from '@/types';
import { Link, router } from '@inertiajs/react';
import { Edit2, Trash2 } from 'lucide-react';

export const columns: Column<Regency>[] = [
    {
        accessorKey: 'code',
        header: 'Code',
    },
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'province.name',
        header: 'Province',
    },
    {
        accessorKey: 'actions',
        header: 'Actions',
        cell: (regency) => {
            const handleDelete = () => {
                if (confirm('Are you sure you want to delete this regency?')) {
                    router.delete(`/dashboard/regencies/${regency.id}`);
                }
            };

            return (
                <div className="flex items-center gap-2">
                    <Link href={`/dashboard/regencies/${regency.id}/edit`}>
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