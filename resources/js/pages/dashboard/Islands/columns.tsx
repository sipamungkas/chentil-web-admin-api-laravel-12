import { Link } from '@inertiajs/react';
import { MoreHorizontal, Pencil, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Island {
    id: number;
    name: string;
    description: string | null;
    provinces_count: number;
}

export const columns = [
    {
        header: 'Name',
        accessorKey: 'name',
    },
    {
        header: 'Description',
        accessorKey: 'description',
    },
    {
        header: 'Provinces',
        accessorKey: 'provinces_count',
    },
    {
        header: 'Actions',
        accessorKey: 'actions',
        cell: (row: Island) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                        <Link href={route('dashboard.islands.edit', row.id)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href={route('dashboard.islands.provinces.index', row.id)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Manage Provinces
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href={route('dashboard.islands.destroy', row.id)} method="delete" as="button">
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
]; 