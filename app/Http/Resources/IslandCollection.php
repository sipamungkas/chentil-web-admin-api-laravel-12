<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use App\Helpers\S3Helper;

class IslandCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return $this->collection->map(function ($item) {
            $data = $item->toArray();
            $data['image'] = S3Helper::getS3ImageUrl($data['image'] ?? null);
            return $data;
        })->all();
    }
}
