import { Button } from '@/components/ui/button';
import { Column, Village } from '@/types';
import { Link, router } from '@inertiajs/react';
import { Edit2, Trash2 } from 'lucide-react';

export const columns: Column<Village>[] = [
    {
        accessorKey: 'code',
        header: 'Code',
    },
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'district.name',
        header: 'District',
    },
    {
        accessorKey: 'district.regency.name',
        header: 'Regency',
    },
    {
        accessorKey: 'district.regency.province.name',
        header: 'Province',
    },
    {
        accessorKey: 'actions',
        header: 'Actions',
        cell: (village) => {
            const handleDelete = () => {
                if (confirm('Are you sure you want to delete this village?')) {
                    router.delete(`/dashboard/villages/${village.id}`);
                }
            };

            return (
                <div className="flex items-center gap-2">
                    <Link href={`/dashboard/villages/${village.id}/edit`}>
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