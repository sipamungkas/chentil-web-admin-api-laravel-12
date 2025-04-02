import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Head, Link } from '@inertiajs/react';

export default function Unauthorized() {
    return (
        <>
            <Head title="Unauthorized Access" />
            <div className="container mx-auto px-4 py-8">
                <Card className="mx-auto max-w-md">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-red-600">Unauthorized Access</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-gray-600">
                            You do not have permission to access this area. This section is restricted to administrators only.
                        </p>
                        <div className="flex justify-center">
                            <Link className="block w-full" method="post" href={route('logout')} as="button">
                                <Button>Logout</Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
