<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Helpers\S3Helper;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'image' => S3Helper::getS3ImageUrl($this->image ?? null),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            // Add more user fields here as needed
        ];
    }
}
