import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { District, Village } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
    code: z.string().min(1, 'Code is required'),
    name: z.string().min(1, 'Name is required'),
    district_id: z.string().min(1, 'District is required'),
});

interface Props {
    village: Village;
    districts: District[];
}

export default function EditVillage({ village, districts }: Props) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            code: village.code,
            name: village.name,
            district_id: village.district.id.toString(),
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        router.put(`/dashboard/villages/${village.id}`, values);
    };

    return (
        <AppSidebarLayout
            breadcrumbs={[
                { title: 'Villages', href: '/dashboard/villages' },
                { title: 'Edit Village', href: `/dashboard/villages/${village.id}/edit` },
            ]}
        >
            <div className="container mx-auto py-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Edit Village</CardTitle>
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
                                                <Input placeholder="Enter village code" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="district_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>District</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a district" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {districts.map((district) => (
                                                        <SelectItem key={district.id} value={district.id.toString()}>
                                                            {district.name} - {district.regency.name} - {district.regency.province.name}
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
                                                <Input placeholder="Enter village name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex justify-end space-x-4">
                                    <Link href="/dashboard/villages">
                                        <Button variant="outline" type="button">
                                            Cancel
                                        </Button>
                                    </Link>
                                    <Button type="submit">Update Village</Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </AppSidebarLayout>
    );
} 