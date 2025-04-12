import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { District, Regency } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
    code: z.string().min(1, 'Code is required'),
    name: z.string().min(1, 'Name is required'),
    regency_id: z.string().min(1, 'Regency is required'),
});

interface Props {
    district: District;
    regencies: Regency[];
}

export default function EditDistrict({ district, regencies }: Props) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            code: district.code,
            name: district.name,
            regency_id: district.regency.id.toString(),
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        router.put(`/dashboard/districts/${district.id}`, values);
    };

    return (
        <AppSidebarLayout
            breadcrumbs={[
                { title: 'Districts', href: '/dashboard/districts' },
                { title: 'Edit District', href: `/dashboard/districts/${district.id}/edit` },
            ]}
        >
            <div className="container mx-auto py-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Edit District</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="code"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Code</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter district code" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="regency_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Regency</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a regency" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {regencies.map((regency) => (
                                                        <SelectItem key={regency.id} value={regency.id.toString()}>
                                                            {regency.name} - {regency.province.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter district name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex justify-end space-x-4">
                                    <Link href="/dashboard/districts">
                                        <Button variant="outline" type="button">
                                            Cancel
                                        </Button>
                                    </Link>
                                    <Button type="submit">Update District</Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </AppSidebarLayout>
    );
} 