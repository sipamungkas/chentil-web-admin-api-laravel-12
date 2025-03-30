import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { CalendarIcon, EyeIcon, EyeOffIcon, ListOrderedIcon } from 'lucide-react';

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
            <div className="container mx-auto p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                        <CardTitle>{title}</CardTitle>
                        <div className="flex gap-2">
                            <Link href={`/dashboard/news/${news.id}/edit`}>
                                <Button variant="outline">Edit</Button>
                            </Link>
                            <Button variant="outline" onClick={() => window.history.back()}>
                                Back
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-8">
                            {news.image && (
                                <div className="relative aspect-video w-96 overflow-hidden rounded-lg">
                                    <img src={news.image} alt={news.title} className="h-full w-full object-cover" />
                                </div>
                            )}

                            <div className="grid gap-6">
                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                                        {news.is_visible ? (
                                            <>
                                                <EyeIcon className="h-4 w-4" />
                                                <span>Visible</span>
                                            </>
                                        ) : (
                                            <>
                                                <EyeOffIcon className="h-4 w-4" />
                                                <span>Hidden</span>
                                            </>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                                        <ListOrderedIcon className="h-4 w-4" />
                                        <span>Order: {news.order}</span>
                                    </div>
                                    <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                                        <CalendarIcon className="h-4 w-4" />
                                        <span>{new Date(news.created_at).toLocaleString()}</span>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="mb-2 text-2xl font-bold">{news.title}</h2>
                                    <p className="whitespace-pre-wrap text-gray-600 dark:text-gray-300">{news.description}</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
