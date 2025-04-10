import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, Pencil, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from '@inertiajs/react';

export interface Island {
    id: number;
    name: string;
    description: string | null;
    provinces: Array<{
        id: number;
        name: string;
        description: string | null;
    }>;
}

export const columns: ColumnDef<Island>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => {
            const description = row.getValue('description') as string | null;
            return description || '-';
        },
    },
    {
        accessorKey: 'provinces',
        header: 'Provinces',
        cell: ({ row }) => {
            const provinces = row.getValue('provinces') as Island['provinces'];
            return provinces.length;
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const island = row.original;

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
                            <Link href={route('islands.edit', island.id)}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={route('islands.provinces.index', island.id)}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Manage Provinces
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link
                                href={route('islands.destroy', island.id)}
                                method="delete"
                                as="button"
                                className="text-destructive"
                            >
                                <Trash className="mr-2 h-4 w-4" />
                                Delete
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
]; 