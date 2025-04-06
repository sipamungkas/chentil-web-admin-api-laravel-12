import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { EventInput, DateSelectArg, EventClickArg } from '@fullcalendar/core';

interface CalendarEvent {
    id: number;
    title: string;
    description: string;
    start: string;
    end: string;
    color: string;
    allDay: boolean;
}

interface EventFormData {
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    color: string;
    all_day: boolean;
}

export default function Index() {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [loading, setLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
    const [formData, setFormData] = useState<EventFormData>({
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        color: '#3788d8',
        all_day: false,
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Event Calendar',
            href: '/dashboard/calendar',
        },
    ];

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('/dashboard/events');
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
            toast.error('Failed to load events');
        }
    };

    const handleDateSelect = (selectInfo: DateSelectArg) => {
        // Format dates to YYYY-MM-DD format
        const formatDate = (dateStr: string) => {
            return dateStr.split('T')[0];
        };

        setFormData({
            title: '',
            description: '',
            start_date: formatDate(selectInfo.startStr),
            end_date: formatDate(selectInfo.endStr),
            color: '#3788d8',
            all_day: selectInfo.allDay,
        });
        setIsDialogOpen(true);
    };

    const handleEventClick = (clickInfo: EventClickArg) => {
        const event = clickInfo.event;
        const startDate = new Date(event.startStr);
        const endDate = new Date(event.endStr);

        // Format dates to YYYY-MM-DD format
        const formatDate = (date: Date) => {
            return date.toISOString().split('T')[0];
        };

        setSelectedEvent({
            id: Number(event.id),
            title: event.title,
            description: event.extendedProps.description || '',
            start: event.startStr,
            end: event.endStr,
            color: event.backgroundColor || '#3788d8',
            allDay: event.allDay,
        });

        setFormData({
            title: event.title,
            description: event.extendedProps.description || '',
            start_date: formatDate(startDate),
            end_date: formatDate(endDate),
            color: event.backgroundColor || '#3788d8',
            all_day: event.allDay,
        });
        setIsDialogOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (selectedEvent) {
                await axios.put(`/dashboard/events/${selectedEvent.id}`, formData);
                toast.success('Event updated successfully');
            } else {
                await axios.post('/dashboard/events', formData);
                toast.success('Event created successfully');
            }
            setIsDialogOpen(false);
            fetchEvents();
        } catch (error) {
            console.error('Error saving event:', error);
            toast.error('Failed to save event');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!selectedEvent) return;

        if (!confirm('Are you sure you want to delete this event?')) {
            return;
        }

        setLoading(true);
        try {
            await axios.delete(`/dashboard/events/${selectedEvent.id}`);
            toast.success('Event deleted successfully');
            setIsDialogOpen(false);
            fetchEvents();
        } catch (error) {
            console.error('Error deleting event:', error);
            toast.error('Failed to delete event');
        } finally {
            setLoading(false);
        }
    };

    const calendarEvents: EventInput[] = events.map(event => ({
        id: String(event.id),
        title: event.title,
        description: event.description,
        start: event.start,
        end: event.end,
        backgroundColor: event.color,
        allDay: event.allDay,
    }));

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Calendar" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Calendar</h1>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Event
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    {selectedEvent ? 'Edit Event' : 'Add Event'}
                                </DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) =>
                                            setFormData({ ...formData, title: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData({ ...formData, description: e.target.value })
                                        }
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="start_date">Start Date</Label>
                                    <Input
                                        id="start_date"
                                        type="date"
                                        value={formData.start_date}
                                        onChange={(e) =>
                                            setFormData({ ...formData, start_date: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="end_date">End Date</Label>
                                    <Input
                                        id="end_date"
                                        type="date"
                                        value={formData.end_date}
                                        onChange={(e) =>
                                            setFormData({ ...formData, end_date: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="color">Color</Label>
                                    <Input
                                        id="color"
                                        type="color"
                                        value={formData.color}
                                        onChange={(e) =>
                                            setFormData({ ...formData, color: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="all_day"
                                        checked={formData.all_day}
                                        onChange={(e) =>
                                            setFormData({ ...formData, all_day: e.target.checked })
                                        }
                                    />
                                    <Label htmlFor="all_day">All Day Event</Label>
                                </div>
                                <div className="flex justify-end space-x-2">
                                    {selectedEvent && (
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            onClick={handleDelete}
                                            disabled={loading}
                                        >
                                            Delete
                                        </Button>
                                    )}
                                    <Button type="submit" disabled={loading}>
                                        {loading ? 'Saving...' : 'Save'}
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="rounded-lg border bg-white p-4">
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay',
                        }}
                        initialView="dayGridMonth"
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        weekends={true}
                        events={calendarEvents}
                        select={handleDateSelect}
                        eventClick={handleEventClick}
                        height="auto"
                    />
                </div>
            </div>
        </AppLayout>
    );
} 