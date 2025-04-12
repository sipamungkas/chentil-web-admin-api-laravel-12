import { LucideIcon } from 'lucide-react';

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface Column<T = unknown> {
    header: string;
    accessorKey: string;
    cell?: (row: T) => React.ReactNode;
    getValue?: (row: T) => string;
}

export interface District {
    id: number;
    code: string;
    name: string;
    regency: {
        id: number;
        name: string;
        province: {
            id: number;
            name: string;
        };
    };
}

export interface Regency {
    id: number;
    code: string;
    name: string;
    province: {
        id: number;
        name: string;
    };
}

export interface Village {
    id: number;
    code: string;
    name: string;
    district: {
        id: number;
        name: string;
        regency: {
            id: number;
            name: string;
            province: {
                id: number;
                name: string;
            };
        };
    };
}

export interface Province {
    id: number;
    code: string;
    name: string;
} 