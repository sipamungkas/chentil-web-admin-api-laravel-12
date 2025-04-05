import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { EyeIcon, EyeOffIcon, MapPinIcon } from 'lucide-react';

interface District {
    id: number;
    code: string;
    regency_id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

interface Content {
    id: number;
    title: string;
    description: string;
    category: string;
    district_id: number;
    image: string | null;
    since_century: string | null;
    established_year: string | null;
    latitude: string;
    longitude: string;
    is_visible: boolean;
    order: number;
    created_at: string;
    updated_at: string;
    district: District;
}

interface Props {
    title: string;
    category: string;
    content: Content;
}

export default function Show({ title, category, content }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: title.replace('Show ', ''),
            href: `/dashboard/${category}s`,
        },
        {
            title: content.title,
            href: `/dashboard/${category}s/${content.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>{content.title}</CardTitle>
                        <div className="flex items-center gap-2">
                            {content.is_visible ? (
                                <div className="flex items-center gap-1 text-sm text-green-600">
                                    <EyeIcon className="h-4 w-4" />
                                    <span>Visible</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                    <EyeOffIcon className="h-4 w-4" />
                                    <span>Hidden</span>
                                </div>
                            )}

                            <Link href={`/dashboard/${category}s/${content.id}/edit`}>
                                <Button variant="outline" size="sm">
                                    Edit
                                </Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {content.image && (
                            <div>
                                <h3 className="mb-2 font-medium">Image</h3>
                                <div className="relative aspect-video h-92 overflow-hidden rounded-lg border border-gray-200">
                                    <img src={`/storage/${content.image}`} alt={content.title} className="h-full w-full object-cover" />
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="font-medium">District:</span> <span className="text-gray-600">{content.district.name}</span>
                            </div>
                            <div>
                                <span className="font-medium">Order:</span> <span className="text-gray-600">{content.order}</span>
                            </div>
                            {content.since_century && (
                                <div>
                                    <span className="font-medium">Century:</span> <span className="text-gray-600">{content.since_century}</span>
                                </div>
                            )}
                            {content.established_year && (
                                <div>
                                    <span className="font-medium">Established Year:</span>{' '}
                                    <span className="text-gray-600">{content.established_year}</span>
                                </div>
                            )}
                            <div>
                                <span className="font-medium">Created At:</span>{' '}
                                <span className="text-gray-600">{new Date(content.created_at).toLocaleDateString()}</span>
                            </div>
                            <div>
                                <span className="font-medium">Updated At:</span>{' '}
                                <span className="text-gray-600">{new Date(content.updated_at).toLocaleDateString()}</span>
                            </div>
                        </div>

                        <div>
                            <h3 className="mb-2 font-medium">Description</h3>
                            <p className="whitespace-pre-wrap text-gray-600">{content.description}</p>
                        </div>

                        <div>
                            <h3 className="mb-2 font-medium">Location</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <MapPinIcon className="h-4 w-4" />
                                <span>
                                    {content.latitude}, {content.longitude}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
