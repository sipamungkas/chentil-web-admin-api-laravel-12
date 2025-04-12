import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { Province, Regency } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
    code: z.string().min(1, 'Code is required'),
    name: z.string().min(1, 'Name is required'),
    province_id: z.string().min(1, 'Province is required'),
});

interface Props {
    regency: Regency;
    provinces: Province[];
}

export default function EditRegency({ regency, provinces }: Props) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            code: regency.code,
            name: regency.name,
            province_id: regency.province.id.toString(),
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        router.put(`/dashboard/regencies/${regency.id}`, values);
    };

    return (
        <AppSidebarLayout
            breadcrumbs={[
                { title: 'Regencies', href: '/dashboard/regencies' },
                { title: 'Edit Regency', href: `/dashboard/regencies/${regency.id}/edit` },
            ]}
        >
            <div className="container mx-auto py-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Edit Regency</CardTitle>
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
                                                <Input placeholder="Enter regency code" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="province_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Province</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a province" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {provinces.map((province) => (
                                                        <SelectItem key={province.id} value={province.id.toString()}>
                                                            {province.name}
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
                                                <Input placeholder="Enter regency name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex justify-end space-x-4">
                                    <Link href="/dashboard/regencies">
                                        <Button variant="outline" type="button">
                                            Cancel
                                        </Button>
                                    </Link>
                                    <Button type="submit">Update Regency</Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </AppSidebarLayout>
    );
} 