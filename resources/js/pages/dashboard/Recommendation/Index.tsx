import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { trimText } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
import { Plus, Sparkles, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

interface Content {
    id: number;
    title: string;
    image: string;
    order: number;
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

interface Props {
    recommendations: Content[];
}

export default function Index({ recommendations }: Props) {
    const [items, setItems] = useState<Content[]>(recommendations || []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Recommendations',
            href: '/dashboard/recommendations',
        },
    ];

    // Ensure items are properly initialized
    useEffect(() => {
        if (recommendations && Array.isArray(recommendations)) {
            setItems(recommendations);
        } else {
            console.error('Invalid recommendations data:', recommendations);
            setError('Failed to load recommendations data');
        }
    }, [recommendations]);

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to remove this content from recommendations?')) {
            return;
        }

        setLoading(true);
        try {
            await axios.delete(`/dashboard/recommendations/${id}`);
            setItems(items.filter((item) => item.id !== id));
            toast.success('Content removed from recommendations');
        } catch (error) {
            console.error('Error deleting recommendation:', error);
            const errorMessage =
                axios.isAxiosError(error) && error.response?.data?.error
                    ? error.response.data.error
                    : 'Failed to remove content from recommendations';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(items.length / itemsPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    if (error) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Recommendations" />
                <div className="flex flex-col gap-4 p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Sparkles className="h-6 w-6" />
                            <h1 className="text-2xl font-bold">Recommendations</h1>
                        </div>
                        <Link href="/dashboard/recommendations/create">
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Recommendation
                            </Button>
                        </Link>
                    </div>
                    <div className="rounded-lg border p-4">
                        <div className="py-8 text-center">
                            <p className="mb-4 text-red-500">{error}</p>
                            <Link href="/dashboard/recommendations/create">
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Your First Recommendation
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Recommendations" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Sparkles className="h-6 w-6" />
                        <h1 className="text-2xl font-bold">Recommendations</h1>
                    </div>
                    <Link href="/dashboard/recommendations/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Recommendation
                        </Button>
                    </Link>
                </div>

                <div className="rounded-lg border p-4">
                    {loading ? (
                        <div className="py-8 text-center">
                            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-gray-900"></div>
                            <p className="mt-4 text-gray-600">Loading...</p>
                        </div>
                    ) : items.length === 0 ? (
                        <div className="py-8 text-center">
                            <p className="mb-4 text-gray-500">No recommendations found.</p>
                            <Link href="/dashboard/recommendations/create">
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Your First Recommendation
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {currentItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md"
                                    >
                                        <div className="relative h-48 w-full">
                                            <img src={item.image} alt={item.title} className="aspect-video h-48 w-full rounded-lg object-cover" />
                                            <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                                                <span className="rounded-full bg-white/20 px-3 py-1 text-xs text-white capitalize backdrop-blur-sm">
                                                    {item.category}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="mb-2 text-lg font-semibold capitalize">{item.title}</h3>
                                            <p className="mb-3 text-sm text-gray-600">{trimText(item.description)}</p>
                                            <p className="mb-4 text-xs text-gray-500">
                                                {item.district?.name}, {item.district?.regency?.name}, {item.district?.regency?.province?.name}
                                            </p>
                                            <div className="flex justify-end">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleDelete(item.id)}
                                                    className="text-red-500 hover:bg-red-50 hover:text-red-700"
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Remove
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="mt-6 flex justify-center">
                                    <nav className="flex items-center space-x-2">
                                        <Button variant="outline" size="sm" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                                            Previous
                                        </Button>
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                                            <Button
                                                key={number}
                                                variant={currentPage === number ? 'default' : 'outline'}
                                                size="sm"
                                                onClick={() => paginate(number)}
                                                className={currentPage === number ? 'bg-primary text-white' : ''}
                                            >
                                                {number}
                                            </Button>
                                        ))}
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => paginate(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                        >
                                            Next
                                        </Button>
                                    </nav>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
