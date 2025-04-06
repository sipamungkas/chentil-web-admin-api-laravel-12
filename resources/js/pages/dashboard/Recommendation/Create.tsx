import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { trimText } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import axios from 'axios';
import { ArrowLeft, Search, Sparkles } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

interface Content {
    id: number;
    title: string;
    image: string;
    description: string;
    category: string;
    district: {
        name: string;
        regency: {
            name: string;
            province: {
                name: string;
            };
        };
    };
}

export default function Create() {
    const [contents, setContents] = useState<Content[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedContentId, setSelectedContentId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [searchLoading, setSearchLoading] = useState(false);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Recommendations',
            href: '/dashboard/recommendations',
        },
        {
            title: 'Add Content to Recommendations',
            href: '/dashboard/recommendations/create',
        },
    ];

    useEffect(() => {
        fetchContents();
    }, []);

    useEffect(() => {
        const searchTimer = setTimeout(() => {
            if (searchQuery) {
                fetchContents(searchQuery);
            } else {
                fetchContents();
            }
        }, 500); // Debounce search for 500ms

        return () => clearTimeout(searchTimer);
    }, [searchQuery]);

    const fetchContents = async (search = '') => {
        if (search) {
            setSearchLoading(true);
        } else if (contents.length === 0) {
            setLoading(true);
        }

        try {
            const response = await axios.get('/dashboard/recommendations/contents', {
                params: { search },
            });
            setContents(response.data);
        } catch (err) {
            console.error('Error fetching contents:', err);
            const errorMessage = axios.isAxiosError(err) && err.response?.data?.error ? err.response.data.error : 'Failed to fetch contents';
            toast.error(errorMessage);
            setContents([]); // Clear contents on error
        } finally {
            setLoading(false);
            setSearchLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedContentId) {
            toast.error('Please select a content');
            return;
        }

        try {
            await axios.post('/dashboard/recommendations', {
                content_id: selectedContentId,
            });
            toast.success('Content added to recommendations successfully');
            router.visit('/dashboard/recommendations');
        } catch (err) {
            console.error('Error adding content to recommendations:', err);
            toast.error('Failed to add content to recommendations');
        }
    };

    if (loading) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Add Content to Recommendations" />
                <div className="flex h-64 items-center justify-center">
                    <div className="text-center">
                        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-gray-900"></div>
                        <p className="mt-4 text-gray-600">Loading contents...</p>
                    </div>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Content to Recommendations" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Sparkles className="h-6 w-6" />
                        <h1 className="text-2xl font-bold">Add Content to Recommendations</h1>
                    </div>
                    <Link href="/dashboard/recommendations">
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Recommendations
                        </Button>
                    </Link>
                </div>

                <div className="rounded-lg border p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <div className="mb-4 flex items-center gap-4">
                                <div className="relative flex-1">
                                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
                                    <Input
                                        type="text"
                                        placeholder="Search by title, district, regency, or province..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-9"
                                    />
                                </div>
                            </div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">Select Content to Add to Recommendations</label>
                            {searchLoading ? (
                                <div className="flex h-32 items-center justify-center">
                                    <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
                                </div>
                            ) : contents.length === 0 ? (
                                <div className="py-8 text-center text-gray-500">No contents found matching your search.</div>
                            ) : (
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {contents.map((content) => (
                                        <div
                                            key={content.id}
                                            className={`cursor-pointer rounded-lg border p-4 transition-colors ${
                                                selectedContentId === content.id
                                                    ? 'border-blue-500 bg-blue-50'
                                                    : 'border-gray-200 hover:border-blue-300'
                                            }`}
                                            onClick={() => setSelectedContentId(content.id)}
                                        >
                                            <img src={content.image} alt={content.title} className="mb-2 h-48 w-full rounded-lg object-cover" />
                                            <h3 className="font-semibold">{content.title}</h3>
                                            <p className="mb-1 text-sm text-gray-600">{trimText(content.description)}</p>
                                            <p className="text-sm text-gray-600">
                                                {content?.district.name}, {content?.district.regency.name}, {content?.district.regency.province.name}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end">
                            <Button type="submit" disabled={!selectedContentId}>
                                Add to Recommendations
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
