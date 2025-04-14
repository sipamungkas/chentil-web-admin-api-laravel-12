// import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Building, Building2, Globe2, Home, Landmark, MapPin, MapPinned, Newspaper, Plane, Users, UtensilsCrossed } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Overview',
        href: 'overview',
    },
];

interface DashboardStats {
    userCount: number;
    outboundCount: number;
    newsCount: number;
    foodAndBeverageCount: number;
    destinationCount: number;
    cultureCount: number;
    islandCount: number;
    provinceCount: number;
    regencyCount: number;
    districtCount: number;
    villageCount: number;
}

export default function Overview({
    userCount,
    outboundCount,
    newsCount,
    foodAndBeverageCount,
    destinationCount,
    cultureCount,
    islandCount,
    provinceCount,
    regencyCount,
    districtCount,
    villageCount,
}: DashboardStats) {
    const cards = [
        {
            title: 'Total Users',
            value: userCount,
            icon: Users,
            color: 'text-blue-500',
        },
        {
            title: 'Outbound Trips',
            value: outboundCount,
            icon: Plane,
            color: 'text-green-500',
        },
        {
            title: 'News Articles',
            value: newsCount,
            icon: Newspaper,
            color: 'text-purple-500',
        },
        {
            title: 'Food & Beverage',
            value: foodAndBeverageCount,
            icon: UtensilsCrossed,
            color: 'text-orange-500',
        },
        {
            title: 'Destinations',
            value: destinationCount,
            icon: MapPin,
            color: 'text-red-500',
        },
        {
            title: 'Cultures',
            value: cultureCount,
            icon: Landmark,
            color: 'text-yellow-500',
        },
        // Location stats
        {
            title: 'Islands',
            value: islandCount,
            icon: Globe2,
            color: 'text-cyan-500',
        },
        {
            title: 'Provinces',
            value: provinceCount,
            icon: Building2,
            color: 'text-indigo-500',
        },
        {
            title: 'Regencies',
            value: regencyCount,
            icon: Building,
            color: 'text-pink-500',
        },
        {
            title: 'Districts',
            value: districtCount,
            icon: MapPinned,
            color: 'text-emerald-500',
        },
        {
            title: 'Villages',
            value: villageCount,
            icon: Home,
            color: 'text-amber-500',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Overview" />
            <div className="flex flex-col gap-4 p-4">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold">Overview</h1>
                    <p className="text-muted-foreground text-sm">Dashboard overview and summary</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                    {cards.map((card) => (
                        <Card key={card.title}>
                            <CardContent className="flex items-center gap-4 p-6">
                                <card.icon className={`h-8 w-8 ${card.color}`} />
                                <div>
                                    <p className="text-muted-foreground text-sm font-medium">{card.title}</p>
                                    <p className="text-2xl font-bold">{card.value}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                {/* <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[400px] flex-1 overflow-hidden rounded-xl border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div> */}
            </div>
        </AppLayout>
    );
}
