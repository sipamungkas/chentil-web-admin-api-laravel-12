<?php

namespace App\Helpers;

class S3Helper
{
    /**
     * Get the full S3 URL for a given image path or return as is if already a URL.
     *
     * @param string|null $path
     * @return string|null
     */
    public static function getS3ImageUrl(?string $path): ?string
    {
        if (empty($path)) {
            return null;
        }
        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
            return $path;
        }
        $awsEndpoint = config('filesystems.disks.s3.endpoint') ?? env('AWS_ENDPOINT');
        $bucket = config('filesystems.disks.s3.bucket') ?? env('AWS_BUCKET');
        $endpoint = rtrim($awsEndpoint, '/');
        $bucket = trim($bucket, '/');
        return $endpoint . '/' . $bucket . '/' . ltrim($path, '/');
    }
}
