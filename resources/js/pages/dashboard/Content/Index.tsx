import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { MapPin, PlusIcon } from 'lucide-react';
import { useEffect } from 'react';

interface Content {
    id: number;
    title: string;
    description: string;
    category: string;
    district: {
        id: number;
        name: string;
    } | null;
    image: string | null;
    since_century: number | null;
    established_year: number | null;
    latitude: number | null;
    longitude: number | null;
    is_visible: boolean;
    order: number;
}

interface Props {
    title: string;
    category: string;
    contents: {
        data: Content[];
        current_page: number;
        last_page: number;
    };
}

export default function Index({ title, category, contents }: Props) {
    useEffect(() => {
        console.log('Content Index Props:', { title, category, contents });
    }, [title, category, contents]);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: title,
            href: `/dashboard/${category}s`,
        },
    ];

    const handleVisibilityToggle = (content: Content) => {
        console.log('Toggling visibility for content:', content);
        router.post(
            `/dashboard/contents/${content.id}/toggle-visibility`,
            {},
            {
                preserveScroll: true,
                onError: (errors) => {
                    console.error('Error toggling visibility:', errors);
                },
            },
        );
    };

    const handleDelete = (contentId: number) => {
        if (confirm('Are you sure you want to delete this item?')) {
            console.log('Deleting content:', contentId);
            router.delete(`/dashboard/contents/${contentId}`, {
                onError: (errors) => {
                    console.error('Error deleting content:', errors);
                },
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">{title}</h1>
                    <Link href={`/dashboard/${category}s/create`}>
                        <Button>
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Add {title.slice(0, -1)}
                        </Button>
                    </Link>
                </div>

                {contents.data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                        <MapPin className="h-12 w-12 text-gray-400" />
                        <h3 className="mt-4 text-lg font-semibold text-gray-900">No {title.toLowerCase()} yet</h3>
                        <p className="mt-2 text-sm text-gray-500">Get started by creating your first {title.toLowerCase().slice(0, -1)}.</p>
                        <Link href={`/dashboard/${category}s/create`} className="mt-4">
                            <Button>
                                <PlusIcon className="mr-2 h-4 w-4" />
                                Create {title.slice(0, -1)}
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="rounded-lg border">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="border-b bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-sm font-medium">Title</th>
                                        <th className="px-4 py-3 text-sm font-medium">Description</th>
                                        <th className="px-4 py-3 text-sm font-medium">Location</th>
                                        <th className="px-4 py-3 text-sm font-medium">Order</th>
                                        <th className="px-4 py-3 text-sm font-medium">Visible</th>
                                        <th className="px-4 py-3 text-sm font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {contents.data.map((item) => (
                                        <tr key={item.id}>
                                            <td className="px-4 py-3">{item.title}</td>
                                            <td className="px-4 py-3">
                                                {item.description.length > 100 ? `${item.description.substring(0, 100)}...` : item.description}
                                            </td>
                                            <td className="px-4 py-3">{item.district?.name || '-'}</td>
                                            <td className="px-4 py-3">{item.order}</td>
                                            <td className="px-4 py-3">
                                                <Switch checked={item.is_visible} onCheckedChange={() => handleVisibilityToggle(item)} />
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex gap-2">
                                                    <Link href={`/dashboard/${category}s/${item.id}`}>
                                                        <Button variant="outline" size="sm">
                                                            View
                                                        </Button>
                                                    </Link>
                                                    <Link href={`/dashboard/${category}s/${item.id}/edit`}>
                                                        <Button variant="outline" size="sm">
                                                            Edit
                                                        </Button>
                                                    </Link>
                                                    <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>
                                                        Delete
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
} 