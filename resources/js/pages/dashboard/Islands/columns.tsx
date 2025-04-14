import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Column } from '@/types';
import { Link, router } from '@inertiajs/react';
import { MoreHorizontal } from 'lucide-react';

interface Island {
    id: number;
    name: string;
    description: string | null;
    image: string | null;
    provinces_count: number;
}

export const columns: Column<Island>[] = [
    {
        accessorKey: 'image',
        header: 'Image',
        cell: (row) => {
            const image = row.image;
            return image ? (
                <img src={`/storage/${image}`} alt={row.name} className="aspect-video w-16 rounded-sm object-cover" />
            ) : (
                <div className="aspect-video w-16 rounded-sm bg-gray-200" />
            );
        },
    },
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'description',
        header: 'Description',
    },
    {
        accessorKey: 'provinces_count',
        header: 'Provinces',
    },
    {
        accessorKey: 'actions',
        header: 'Actions',
        cell: (row) => {
            const handleDelete = () => {
                if (confirm('Are you sure you want to delete this island?')) {
                    router.delete(`/dashboard/islands/${row.id}`);
                }
            };

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                            <Link href={`/dashboard/islands/${row.id}/edit`}>Edit</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => {
                                router.get(`/dashboard/islands/${row.id}/provinces`);
                            }}
                        >
                            Manage Provinces
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
