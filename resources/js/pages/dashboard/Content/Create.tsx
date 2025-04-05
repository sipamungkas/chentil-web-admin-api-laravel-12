import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface District {
    id: number;
    code: string;
    regency_id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

interface Regency {
    id: number;
    name: string;
    province_id: number;
}

interface Province {
    id: number;
    name: string;
}

interface Props {
    title: string;
    category: string;
}

export default function Create({ title, category }: Props) {
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
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [regencies, setRegencies] = useState<Regency[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: category,
        province_id: '',
        regency_id: '',
        district_id: '',
        image: null as File | null,
        since_century: '',
        established_year: '',
        latitude: '',
        longitude: '',
        is_visible: true,
        order: '0',
    });

    // Fetch provinces on component mount
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                console.log('Fetching provinces...');
                const response = await axios.get<Province[]>('/dashboard/provinces', {});
                console.log('Provinces response:', response.data);
                setProvinces(response.data);
            } catch (error) {
                console.error('Error fetching provinces:', error);
                if (axios.isAxiosError(error)) {
                    console.error('Response:', error.response?.data);
                }
            }
        };
        fetchProvinces();
    }, []);

    // Fetch regencies when province is selected
    useEffect(() => {
        const fetchRegencies = async () => {
            if (formData.province_id) {
                try {
                    console.log('Fetching regencies for province:', formData.province_id);
                    const response = await axios.get<Regency[]>(`/dashboard/provinces/${formData.province_id}/regencies`, {});
                    console.log('Regencies response:', response.data);
                    setRegencies(response.data);
                    // Clear regency and district selection when province changes
                    setFormData((prev) => ({ ...prev, regency_id: '', district_id: '' }));
                    setDistricts([]);
                } catch (error) {
                    console.error('Error fetching regencies:', error);
                    if (axios.isAxiosError(error)) {
                        console.error('Response:', error.response?.data);
                    }
                }
            } else {
                setRegencies([]);
                setDistricts([]);
            }
        };
        fetchRegencies();
    }, [formData.province_id]);

    // Fetch districts when regency is selected
    useEffect(() => {
        const fetchDistricts = async () => {
            if (formData.regency_id) {
                try {
                    console.log('Fetching districts for regency:', formData.regency_id);
                    const response = await axios.get<District[]>(`/dashboard/regencies/${formData.regency_id}/districts`, {});
                    // const response = await axios.get<Regency[]>(`/dashboard/provinces/${formData.province_id}/regencies`, {});
                    console.log('Districts response:', response.data);
                    setDistricts(response.data);
                    // Clear district selection when regency changes
                    setFormData((prev) => ({ ...prev, district_id: '' }));
                } catch (error) {
                    console.error('Error fetching districts:', error);
                    if (axios.isAxiosError(error)) {
                        console.error('Response:', error.response?.data);
                    }
                }
            } else {
                setDistricts([]);
            }
        };
        fetchDistricts();
    }, [formData.regency_id]);

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
            const file = e.target.files[0];
            setFormData({ ...formData, image: file });

            // Create a preview URL for the image
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setFormData({ ...formData, image: null });
            setImagePreview(null);
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

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <Label htmlFor="province_id">Province</Label>
                                    <select
                                        id="province_id"
                                        className={`block w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300`}
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
                                </div>

                                <div>
                                    <Label htmlFor="regency_id">Regency</Label>
                                    <select
                                        id="regency_id"
                                        className={`block w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300`}
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

                            <div>
                                <Label htmlFor="image">Image</Label>
                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className={`${errors.image ? 'border-red-500' : ''} ${imagePreview ? 'hidden' : ''}`}
                                />
                                {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}

                                {imagePreview && (
                                    <div className="mt-2">
                                        <p className="mb-1 text-sm font-medium">Preview:</p>
                                        <div className="relative aspect-video h-92 overflow-hidden rounded-md border border-gray-200">
                                            <img src={imagePreview} alt="Image preview" className="aspect-video h-full w-full object-cover" />
                                        </div>
                                        <div className="mt-2 flex space-x-2">
                                            <Button 
                                                type="button" 
                                                variant="outline" 
                                                onClick={() => document.getElementById('image')?.click()}
                                            >
                                                Change Image
                                            </Button>
                                            <Button 
                                                type="button" 
                                                variant="outline" 
                                                onClick={() => {
                                                    setFormData({ ...formData, image: null });
                                                    setImagePreview(null);
                                                }}
                                            >
                                                Remove Image
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {category === 'culture' && (
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
                            )}
                            {/* : 
                            (
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
                            )} */}

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
