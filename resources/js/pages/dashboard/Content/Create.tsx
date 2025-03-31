import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

interface District {
    id: number;
    name: string;
}

interface Props {
    title: string;
    category: string;
    districts: District[];
}

export default function Create({ title, category, districts }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: title.replace('Create ', ''),
            href: `/dashboard/${category}s`,
        },
        {
            title: 'Create',
            href: `/dashboard/${category}s/create`,
        },
    ];

    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: category,
        district_id: '',
        image: null as File | null,
        since_century: '',
        established_year: '',
        latitude: '',
        longitude: '',
        is_visible: true,
        order: '0',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        const data = new FormData();

        // Append all form fields to FormData
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== null && value !== '') {
                if (key === 'image' && value instanceof File) {
                    data.append(key, value);
                } else {
                    data.append(key, String(value));
                }
            }
        });

        router.post('/dashboard/contents', data, {
            onSuccess: () => {
                setProcessing(false);
            },
            onError: (errors) => {
                setErrors(errors);
                setProcessing(false);
            },
            forceFormData: true,
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setFormData({ ...formData, image: e.target.files[0] });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>{title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className={errors.title ? 'border-red-500' : ''}
                                />
                                {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                            </div>

                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className={errors.description ? 'border-red-500' : ''}
                                />
                                {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                            </div>

                            <div>
                                <Label htmlFor="district_id">District</Label>
                                <select
                                    id="district_id"
                                    className={`block w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300 ${
                                        errors.district_id ? 'border-red-500' : ''
                                    }`}
                                    value={formData.district_id}
                                    onChange={(e) => setFormData({ ...formData, district_id: e.target.value })}
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

                            <div>
                                <Label htmlFor="image">Image</Label>
                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className={errors.image ? 'border-red-500' : ''}
                                />
                                {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
                            </div>

                            {category === 'culture' ? (
                                <div>
                                    <Label htmlFor="since_century">Century</Label>
                                    <Input
                                        id="since_century"
                                        type="number"
                                        min="1"
                                        max="21"
                                        value={formData.since_century}
                                        onChange={(e) => setFormData({ ...formData, since_century: e.target.value })}
                                        className={errors.since_century ? 'border-red-500' : ''}
                                    />
                                    {errors.since_century && <p className="mt-1 text-sm text-red-500">{errors.since_century}</p>}
                                </div>
                            ) : (
                                <div>
                                    <Label htmlFor="established_year">Established Year</Label>
                                    <Input
                                        id="established_year"
                                        type="number"
                                        min="1800"
                                        max={new Date().getFullYear()}
                                        value={formData.established_year}
                                        onChange={(e) => setFormData({ ...formData, established_year: e.target.value })}
                                        className={errors.established_year ? 'border-red-500' : ''}
                                    />
                                    {errors.established_year && <p className="mt-1 text-sm text-red-500">{errors.established_year}</p>}
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="latitude">Latitude</Label>
                                    <Input
                                        id="latitude"
                                        type="number"
                                        step="any"
                                        value={formData.latitude}
                                        onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                                        className={errors.latitude ? 'border-red-500' : ''}
                                    />
                                    {errors.latitude && <p className="mt-1 text-sm text-red-500">{errors.latitude}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="longitude">Longitude</Label>
                                    <Input
                                        id="longitude"
                                        type="number"
                                        step="any"
                                        value={formData.longitude}
                                        onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                                        className={errors.longitude ? 'border-red-500' : ''}
                                    />
                                    {errors.longitude && <p className="mt-1 text-sm text-red-500">{errors.longitude}</p>}
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="order">Order</Label>
                                <Input
                                    id="order"
                                    type="number"
                                    min="0"
                                    value={formData.order}
                                    onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                                    className={errors.order ? 'border-red-500' : ''}
                                />
                                {errors.order && <p className="mt-1 text-sm text-red-500">{errors.order}</p>}
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="is_visible"
                                    checked={formData.is_visible}
                                    onCheckedChange={(checked) => setFormData({ ...formData, is_visible: checked })}
                                />
                                <Label htmlFor="is_visible">Visible</Label>
                            </div>

                            <div className="flex justify-end">
                                <Button type="submit" disabled={processing}>
                                    Create
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
} 