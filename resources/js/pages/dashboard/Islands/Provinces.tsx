import { Head, router } from '@inertiajs/react';
import debounce from 'lodash/debounce';
import { Plus, X } from 'lucide-react';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';

interface Province {
    id: number;
    name: string;
    code: string;
}

interface Props {
    island: {
        id: number;
        name: string;
        provinces: Province[];
    };
    availableProvinces: Province[];
    filters: {
        search: string;
    };
}

export default function Provinces({ island, availableProvinces, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');

    const debouncedSearch = useCallback(
        debounce((value: string) => {
            router.get(
                `/dashboard/islands/${island.id}/provinces`,
                {
                    search: value,
                },
                {
                    preserveState: true,
                    preserveScroll: true,
                },
            );
        }, 300),
        [island.id],
    );

    const handleSearch = (value: string) => {
        setSearch(value);
        debouncedSearch(value);
    };

    const handleAddProvince = (provinceId: number) => {
        router.post(
            `/dashboard/islands/${island.id}/provinces`,
            {
                province_id: provinceId,
            },
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Province added successfully');
                },
            },
        );
    };

    const handleRemoveProvince = (provinceId: number) => {
        router.post(
            `/dashboard/islands/${island.id}/provinces/remove`,
            {
                province_id: provinceId,
            },
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Province removed successfully');
                },
                onError: (errors) => {
                    toast.error(errors.message || 'Failed to remove province');
                },
            },
        );
    };

    return (
        <AppLayout>
            <Head title={`Manage Provinces - ${island.name}`} />

            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">Manage Provinces - {island.name}</h1>
                        <p className="text-muted-foreground text-sm">Add or remove provinces from this island.</p>
                    </div>
                </div>

                <div className="mt-6">
                    <Input placeholder="Search provinces..." value={search} onChange={(e) => handleSearch(e.target.value)} className="max-w-sm" />
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Current Provinces</CardTitle>
                            <CardDescription>Provinces currently assigned to this island.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {island.provinces.map((province) => (
                                    <div key={province.id} className="flex items-center justify-between rounded-lg border p-3">
                                        <div>
                                            <div className="font-medium">{province.name}</div>
                                            <div className="text-muted-foreground text-sm">Code: {province.code}</div>
                                        </div>
                                        <Button variant="ghost" size="icon" onClick={() => handleRemoveProvince(province.id)}>
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                {island.provinces.length === 0 && <div className="text-muted-foreground text-sm">No provinces assigned yet.</div>}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Available Provinces</CardTitle>
                            <CardDescription>Provinces that can be added to this island.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {availableProvinces.map((province) => (
                                    <div key={province.id} className="flex items-center justify-between rounded-lg border p-3">
                                        <div>
                                            <div className="font-medium">{province.name}</div>
                                            <div className="text-muted-foreground text-sm">Code: {province.code}</div>
                                        </div>
                                        <Button variant="ghost" size="icon" onClick={() => handleAddProvince(province.id)}>
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                {availableProvinces.length === 0 && <div className="text-muted-foreground text-sm">No provinces available.</div>}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
