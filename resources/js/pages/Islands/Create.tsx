import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type FormData = {
    name: string;
    description: string;
    [key: string]: string;
};

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm<FormData>({
        name: '',
        description: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('islands.store'), {
            onFinish: () => reset(),
        });
    };

    return (
        <>
            <Head title="Create Island" />

            <div className="container py-10">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold tracking-tight">Create Island</h2>
                    <p className="text-muted-foreground">
                        Add a new island to the system
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
                        Create Island
                    </Button>
                </form>
            </div>
        </>
    );
} 