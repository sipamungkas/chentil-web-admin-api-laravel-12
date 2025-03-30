import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';

interface News {
    id: number;
    title: string;
    description: string;
    image: string | null;
    is_visible: boolean;
    order: number;
    created_at: string;
}

interface Props {
    title: string;
    news: {
        data: News[];
        current_page: number;
        last_page: number;
    };
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
];

export default function Index({ title, news }: Props) {
    const handleVisibilityToggle = (newsItem: News) => {
        router.post(
            `/dashboard/news/${newsItem.id}/toggle-visibility`,
            {},
            {
                preserveScroll: true,
            },
        );
    };

    const handleDelete = (newsId: number) => {
        if (confirm('Are you sure you want to delete this news?')) {
            router.delete(`/dashboard/news/${newsId}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">{title}</h1>
                    <Link href="/dashboard/news/create">
                        <Button>
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Add News
                        </Button>
                    </Link>
                </div>

                <div className="rounded-lg border">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-sm font-medium">Title</th>
                                    <th className="px-4 py-3 text-sm font-medium">Description</th>
                                    <th className="px-4 py-3 text-sm font-medium">Order</th>
                                    <th className="px-4 py-3 text-sm font-medium">Visible</th>
                                    <th className="px-4 py-3 text-sm font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {news.data.map((item) => (
                                    <tr key={item.id}>
                                        <td className="px-4 py-3">{item.title}</td>
                                        <td className="px-4 py-3">
                                            {item.description.length > 100 ? `${item.description.substring(0, 100)}...` : item.description}
                                        </td>
                                        <td className="px-4 py-3">{item.order}</td>
                                        <td className="px-4 py-3">
                                            <Switch checked={item.is_visible} onCheckedChange={() => handleVisibilityToggle(item)} />
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex gap-2">
                                                <Link href={`/dashboard/news/${item.id}`}>
                                                    <Button variant="outline" size="sm">
                                                        View
                                                    </Button>
                                                </Link>
                                                <Link href={`/dashboard/news/${item.id}/edit`}>
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
            </div>
        </AppLayout>
    );
}
