<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Recommendation extends Model
{
    /**
     * Get the contents for the recommendation.
     */
    public function contents(): BelongsToMany
    {
        return $this->belongsToMany(Content::class, 'content_recommendation')
            ->withPivot('order')
            ->orderByPivot('order', 'asc');
    }
}
