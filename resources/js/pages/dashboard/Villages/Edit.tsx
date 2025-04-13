import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, District, Province, Regency, Village } from '@/types';
import { Head, router } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Props {
    village: Village;
}

export default function Edit({ village }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Villages',
            href: '/dashboard/villages',
        },
        {
            title: 'Edit Village',
            href: `/dashboard/villages/${village.id}/edit`,
        },
    ];

    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [regencies, setRegencies] = useState<Regency[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [formData, setFormData] = useState({
        code: village.code,
        name: village.name,
        province_id: village.district.regency.province.id.toString(),
        regency_id: village.district.regency.id.toString(),
        district_id: village.district.id.toString(),
    });

    // Fetch provinces on component mount
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await axios.get<Province[]>('/dashboard/provinces');
                setProvinces(response.data);
            } catch (error) {
                console.error('Error fetching provinces:', error);
            }
        };
        fetchProvinces();
    }, []);

    // Fetch regencies when province is selected
    useEffect(() => {
        const fetchRegencies = async () => {
            if (formData.province_id) {
                try {
                    const response = await axios.get<Regency[]>(`/dashboard/provinces/${formData.province_id}/regencies`);
                    setRegencies(response.data);
                } catch (error) {
                    console.error('Error fetching regencies:', error);
                }
            } else {
                setRegencies([]);
                setFormData(prev => ({ ...prev, regency_id: '', district_id: '' }));
            }
        };
        fetchRegencies();
    }, [formData.province_id]);

    // Fetch districts when regency is selected
    useEffect(() => {
        const fetchDistricts = async () => {
            if (formData.regency_id) {
                try {
                    const response = await axios.get<District[]>(`/dashboard/regencies/${formData.regency_id}/districts`);
                    setDistricts(response.data);
                } catch (error) {
                    console.error('Error fetching districts:', error);
                }
            } else {
                setDistricts([]);
                setFormData(prev => ({ ...prev, district_id: '' }));
            }
        };
        fetchDistricts();
    }, [formData.regency_id]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        router.put(`/dashboard/villages/${village.id}`, formData, {
            onSuccess: () => {
                setProcessing(false);
            },
            onError: (errors) => {
                setErrors(errors);
                setProcessing(false);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Village" />
            <div className="p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Edit Village</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="code">Code</Label>
                                <Input
                                    id="code"
                                    value={formData.code}
                                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                    className={errors.code ? 'border-red-500' : ''}
                                />
                                {errors.code && <p className="mt-1 text-sm text-red-500">{errors.code}</p>}
                            </div>

                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className={errors.name ? 'border-red-500' : ''}
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <Label htmlFor="province_id">Province</Label>
                                    <select
                                        id="province_id"
                                        className={`block w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300 ${
                                            errors.province_id ? 'border-red-500' : ''
                                        }`}
                                        value={formData.province_id}
                                        onChange={(e) => setFormData({ ...formData, province_id: e.target.value })}
                                    >
                                        <option value="">Select a province</option>
                                        {provinces.map((province) => (
                                            <option key={province.id} value={province.id}>
                                                {province.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.province_id && <p className="mt-1 text-sm text-red-500">{errors.province_id}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="regency_id">Regency</Label>
                                    <select
                                        id="regency_id"
                                        className={`block w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300 ${
                                            errors.regency_id ? 'border-red-500' : ''
                                        }`}
                                        value={formData.regency_id}
                                        onChange={(e) => setFormData({ ...formData, regency_id: e.target.value })}
                                        disabled={!formData.province_id}
                                    >
                                        <option value="">Select a regency</option>
                                        {regencies.map((regency) => (
                                            <option key={regency.id} value={regency.id}>
                                                {regency.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.regency_id && <p className="mt-1 text-sm text-red-500">{errors.regency_id}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="district_id">District</Label>
                                    <select
                                        id="district_id"
                                        className={`block w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300 ${
                                            errors.district_id ? 'border-red-500' : ''
                                        }`}
                                        value={formData.district_id}
                                        onChange={(e) => setFormData({ ...formData, district_id: e.target.value })}
                                        disabled={!formData.regency_id}
                                    >
                                        <option value="">Select a district</option>
                                        {districts.map((district) => (
                                            <option key={district.id} value={district.id}>
                                                {district.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.district_id && <p className="mt-1 text-sm text-red-500">{errors.district_id}</p>}
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Button type="submit" disabled={processing}>
                                    Update Village
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
} 