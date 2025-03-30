// import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Landmark, MapPin, Newspaper, Plane, Users, UtensilsCrossed } from 'lucide-react';

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
}

export default function Overview({ userCount }: { userCount: number }) {
    // Dummy data for demonstration
    const stats: DashboardStats = {
        userCount: userCount,
        outboundCount: 56,
        newsCount: 89,
        foodAndBeverageCount: 45,
        destinationCount: 78,
        cultureCount: 34,
    };

    const statCards = [
        {
            title: 'Total Users',
            value: stats.userCount,
            icon: Users,
            color: 'text-blue-500',
        },
        {
            title: 'Outbound Trips',
            value: stats.outboundCount,
            icon: Plane,
            color: 'text-green-500',
        },
        {
            title: 'News Articles',
            value: stats.newsCount,
            icon: Newspaper,
            color: 'text-purple-500',
        },
        {
            title: 'Food & Beverage',
            value: stats.foodAndBeverageCount,
            icon: UtensilsCrossed,
            color: 'text-orange-500',
        },
        {
            title: 'Destinations',
            value: stats.destinationCount,
            icon: MapPin,
            color: 'text-red-500',
        },
        {
            title: 'Cultures',
            value: stats.cultureCount,
            icon: Landmark,
            color: 'text-yellow-500',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Overview" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {statCards.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={index}
                                className="border-sidebar-border/70 dark:border-sidebar-border relative flex flex-col gap-2 rounded-xl border p-4"
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="text-muted-foreground text-sm font-medium">{stat.title}</h3>
                                    <Icon className={`size-5 ${stat.color}`} />
                                </div>
                                <div className="text-2xl font-bold">{stat.value}</div>
                            </div>
                        );
                    })}
                </div>
                {/* <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[400px] flex-1 overflow-hidden rounded-xl border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div> */}
            </div>
        </AppLayout>
    );
}
