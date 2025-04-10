import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Island {
    id: number;
    name: string;
    description: string | null;
}

interface Province {
    id: number;
    name: string;
    description: string | null;
    island_id: number;
}

interface Props {
    island: Island;
    province: Province;
}

type FormData = {
    name: string;
    description: string;
    [key: string]: string;
};

export default function Edit({ island, province }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm<FormData>({
        name: province.name,
        description: province.description || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('islands.provinces.update', [island.id, province.id]), {
            onFinish: () => reset(),
        });
    };

    return (
        <>
            <Head title={`Edit Province - ${island.name}`} />

            <div className="container py-10">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold tracking-tight">
                        Edit Province in {island.name}
                    </h2>
                    <p className="text-muted-foreground">
                        Update province information
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        />
                        <InputError message={errors.description} />
                    </div>

                    <Button type="submit" disabled={processing}>
                        {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                        Update Province
                    </Button>
                </form>
            </div>
        </>
    );
} 