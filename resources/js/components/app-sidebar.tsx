import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Calendar, Compass, Folder, LayoutGrid, Newspaper, Palmtree, Sparkles, UtensilsCrossed, Waves } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Overview',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'News',
        href: '/dashboard/news',
        icon: Newspaper,
    },
];

const contentNavItems: NavItem[] = [
    {
        title: 'Destinations',
        href: '/dashboard/destinations',
        icon: Compass,
    },
    {
        title: 'Outbound',
        href: '/dashboard/outbounds',
        icon: Waves,
    },
    {
        title: 'Cultural Heritage',
        href: '/dashboard/cultures',
        icon: Palmtree,
    },
    {
        title: 'Food & Beverages',
        href: '/dashboard/food-and-beverages',
        icon: UtensilsCrossed,
    },
    {
        title: 'Recommendations',
        href: '/dashboard/recommendations',
        icon: Sparkles,
    },
    {
        title: 'Event Calendar',
        href: '/dashboard/calendar',
        icon: Calendar,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/sipamungkas/chentil-web',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="floating">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
                <NavMain items={contentNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
