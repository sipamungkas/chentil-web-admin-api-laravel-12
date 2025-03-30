import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
    title: string;
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
        title: 'Create',
        href: '/dashboard/news/create',
    },
];

export default function Create({ title }: Props) {
    const [processing, setProcessing] = useState(false);
    const [data, setData] = useState({
        title: '',
        description: '',
        image: null as File | null,
        is_visible: true,
        order: 0,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('is_visible', data.is_visible ? '1' : '0');
        formData.append('order', data.order.toString());
        if (data.image) {
            formData.append('image', data.image);
        }

        router.post('/dashboard/news', formData, {
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
            <div className="flex flex-col gap-4 p-4">
                <h1 className="text-2xl font-bold">{title}</h1>

                <form onSubmit={handleSubmit} className="flex max-w-2xl flex-col gap-4" encType="multipart/form-data">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input 
                            id="title" 
                            value={data.title} 
                            onChange={(e) => setData({ ...data, title: e.target.value })} 
                            error={errors.title}
                        />
                    </div>

                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData({ ...data, description: e.target.value })}
                            error={errors.description}
                            rows={5}
                        />
                    </div>

                    <div>
                        <Label htmlFor="image">Image</Label>
                        <Input 
                            id="image" 
                            type="file" 
                            onChange={(e) => setData({ ...data, image: e.target.files?.[0] || null })}
                            error={errors.image}
                            accept="image/*"
                        />
                    </div>

                    <div>
                        <Label htmlFor="order">Order</Label>
                        <Input
                            id="order"
                            type="number"
                            value={data.order}
                            onChange={(e) => setData({ ...data, order: parseInt(e.target.value) })}
                            error={errors.order}
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <Switch 
                            id="is_visible" 
                            checked={data.is_visible} 
                            onCheckedChange={(checked) => setData({ ...data, is_visible: checked })}
                        />
                        <Label htmlFor="is_visible">Visible</Label>
                    </div>

                    <div className="flex gap-2">
                        <Button type="submit" disabled={processing}>
                            Create News
                        </Button>
                        <Button type="button" variant="outline" onClick={() => window.history.back()}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
