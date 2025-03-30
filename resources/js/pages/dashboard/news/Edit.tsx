import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ImageIcon, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface News {
    id: number;
    title: string;
    description: string;
    image: string | null;
    is_visible: boolean;
    order: number;
}

interface Props {
    title: string;
    news: News;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'News',
        href: '/dashboard/news',
    },
    {
        title: 'Edit',
        href: '#',
    },
];

export default function Edit({ title, news }: Props) {
    const [processing, setProcessing] = useState(false);
    const [data, setData] = useState({
        title: news.title,
        description: news.description,
        image: null as File | null,
        is_visible: news.is_visible,
        order: news.order,
    });
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData({ ...data, image: file });

        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        } else {
            setPreviewUrl(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('is_visible', data.is_visible ? '1' : '0');
        formData.append('order', data.order.toString());
        if (data.image) {
            formData.append('image', data.image);
        }

        router.post(`/dashboard/news/${news.id}`, formData, {
            onError: (errors) => {
                setErrors(errors);
                setProcessing(false);
            },
            onSuccess: () => {
                setProcessing(false);
            },
            forceFormData: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="container mx-auto p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>{title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6" encType="multipart/form-data">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="title">Title</Label>
                                        <Input
                                            id="title"
                                            value={data.title}
                                            onChange={(e) => setData({ ...data, title: e.target.value })}
                                            error={errors.title}
                                            placeholder="Enter news title"
                                        />
                                        {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) => setData({ ...data, description: e.target.value })}
                                            error={errors.description}
                                            rows={5}
                                            placeholder="Enter news description"
                                        />
                                        {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="order">Order</Label>
                                        <Input
                                            id="order"
                                            type="number"
                                            value={data.order}
                                            onChange={(e) => setData({ ...data, order: parseInt(e.target.value) })}
                                            error={errors.order}
                                            min={0}
                                        />
                                        {errors.order && <p className="mt-1 text-sm text-red-500">{errors.order}</p>}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Switch
                                            id="is_visible"
                                            checked={data.is_visible}
                                            onCheckedChange={(checked) => setData({ ...data, is_visible: checked })}
                                        />
                                        <Label htmlFor="is_visible">Visible</Label>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <Label>Image Preview</Label>
                                    <div className="relative aspect-video w-full overflow-hidden rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-800">
                                        {previewUrl ? (
                                            <img src={previewUrl} alt="Preview" className="h-full w-full object-cover" />
                                        ) : news.image ? (
                                            <img src={`/storage/${news.image}`} alt={news.title} className="h-full w-full object-cover" />
                                        ) : (
                                            <div className="flex h-full flex-col items-center justify-center gap-2 text-gray-500">
                                                <ImageIcon className="h-8 w-8" />
                                                <span>No image selected</span>
                                            </div>
                                        )}
                                        <Input
                                            id="image"
                                            type="file"
                                            onChange={handleImageChange}
                                            error={errors.image}
                                            accept="image/*"
                                            className="absolute inset-0 cursor-pointer opacity-0"
                                        />
                                    </div>
                                    {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}>
                                    {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Update News
                                </Button>
                                <Button type="button" variant="outline" onClick={() => window.history.back()}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
