import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

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
        title: 'View',
        href: '#',
    },
];

export default function Show({ title, news }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">{title}</h1>
                    <div className="flex gap-2">
                        <Link href={`/dashboard/news/${news.id}/edit`}>
                            <Button variant="outline">Edit</Button>
                        </Link>
                        <Button variant="outline" onClick={() => window.history.back()}>
                            Back
                        </Button>
                    </div>
                </div>

                <div className="grid max-w-4xl gap-8">
                    {news.image && (
                        <div>
                            <img src={news.image} alt={news.title} className="aspect-video rounded-lg object-cover" />
                        </div>
                    )}

                    <div className="grid gap-4">
                        <div>
                            <h2 className="text-lg font-semibold">Title</h2>
                            <p>{news.title}</p>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold">Description</h2>
                            <p className="whitespace-pre-wrap">{news.description}</p>
                        </div>

                        <div className="grid gap-2 sm:grid-cols-2">
                            <div>
                                <h2 className="text-lg font-semibold">Visibility</h2>
                                <p>{news.is_visible ? 'Visible' : 'Hidden'}</p>
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold">Order</h2>
                                <p>{news.order}</p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold">Created At</h2>
                            <p>{new Date(news.created_at).toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
