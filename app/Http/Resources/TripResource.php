<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TripResource extends JsonResource
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
            'description' => $this->description,
            'user_id' => $this->user_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            // 'contents' => $this->whenLoaded('contents', function () {
            //     return $this->contents->map(function ($content) {
            //         return [
            //             'id' => $content->id,
            //             'title' => $content->title ?? null,
            //             'category' => $content->category ?? null,
            //         ];
            //     });
            // }),
            'contents' => new ContentCollection($this->whenLoaded('contents')),
        ];
    }
}
