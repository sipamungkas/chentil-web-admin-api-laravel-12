<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Content extends Model
{
    protected $fillable = [
        'title',
        'description',
        'category',
        'province_id',
        'regency_id',
        'district_id',
        'image',
        'recommendation',
        'since_century',
        'established_year',
        'latitude',
        'longitude',
        'is_visible',
        'order',
    ];

    protected $casts = [
        'is_visible' => 'boolean',
        'recommendation' => 'boolean',
        'since_century' => 'integer',
        'established_year' => 'integer',
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
        'order' => 'integer',
    ];

    // Category constants
    const CATEGORY_DESTINATION = 'destination';
    const CATEGORY_OUTBOUND = 'outbound';
    const CATEGORY_CULTURE = 'culture';
    const CATEGORY_FOOD_AND_BEVERAGE = 'fnb';

    public function province(): BelongsTo
    {
        return $this->belongsTo(Province::class);
    }

    public function regency(): BelongsTo
    {
        return $this->belongsTo(Regency::class);
    }

    public function district(): BelongsTo
    {
        return $this->belongsTo(District::class);
    }

    /**
     * Get the recommendations for the content.
     */
    public function recommendations(): BelongsToMany
    {
        return $this->belongsToMany(Recommendation::class, 'content_recommendation')
            ->withPivot('order')
            ->orderByPivot('order', 'asc');
    }

    /**
     * Get the users that have favorited this content.
     */
    public function favoritedBy()
    {
        return $this->belongsToMany(User::class, 'favorites')
            ->withTimestamps();
    }

    /**
     * Get the users that have wishlisted this content.
     */
    public function wishlistedBy()
    {
        return $this->belongsToMany(User::class, 'wishlists')
            ->withTimestamps();
    }

    // Scope for each category
    public function scopeDestination($query)
    {
        return $query->where('category', self::CATEGORY_DESTINATION);
    }

    public function scopeOutbound($query)
    {
        return $query->where('category', self::CATEGORY_OUTBOUND);
    }

    public function scopeCulture($query)
    {
        return $query->where('category', self::CATEGORY_CULTURE);
    }

    public function scopeFoodAndBeverage($query)
    {
        return $query->where('category', self::CATEGORY_FOOD_AND_BEVERAGE);
    }

    // Scope for visible content
    public function scopeVisible($query)
    {
        return $query->where('is_visible', true);
    }

    // Scope for ordered content
    public function scopeOrdered($query)
    {
        return $query->orderBy('order');
    }

    // Get nearby locations within radius (in kilometers)
    public function scopeNearby($query, $latitude, $longitude, $radius = 5)
    {
        return $query->whereRaw('
            ST_DWithin(
                ST_MakePoint(longitude, latitude)::geography,
                ST_MakePoint(?, ?)::geography,
                ?
            )',
            [$longitude, $latitude, $radius * 1000] // Convert km to meters
        );
    }
}
