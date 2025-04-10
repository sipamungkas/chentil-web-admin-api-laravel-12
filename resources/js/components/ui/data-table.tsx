import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Link } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

interface Column {
    header: string;
    accessorKey: string;
    cell?: (row: any) => React.ReactNode;
}

interface Pagination {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
    from: number;
    to: number;
}

interface DataTableProps {
    columns: Column[];
    data: any[];
    pagination: Pagination;
}

export function DataTable({ columns, data, pagination }: DataTableProps) {
    const { currentPage, lastPage, from, to, total } = pagination;

    return (
        <div className="space-y-4">
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((column) => (
                                <TableHead key={column.accessorKey}>
                                    {column.header}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={index}>
                                {columns.map((column) => (
                                    <TableCell key={column.accessorKey}>
                                        {column.cell ? column.cell(row) : row[column.accessorKey]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between px-2">
                <div className="text-sm text-muted-foreground">
                    Showing {from} to {to} of {total} entries
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="icon"
                        disabled={currentPage === 1}
                        asChild
                    >
                        <Link
                            href={window.location.pathname + '?page=1'}
                            preserveState
                        >
                            <ChevronsLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        disabled={currentPage === 1}
                        asChild
                    >
                        <Link
                            href={window.location.pathname + `?page=${currentPage - 1}`}
                            preserveState
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        disabled={currentPage === lastPage}
                        asChild
                    >
                        <Link
                            href={window.location.pathname + `?page=${currentPage + 1}`}
                            preserveState
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        disabled={currentPage === lastPage}
                        asChild
                    >
                        <Link
                            href={window.location.pathname + `?page=${lastPage}`}
                            preserveState
                        >
                            <ChevronsRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
} 