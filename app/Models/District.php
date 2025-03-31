<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class District extends Model
{
    protected $fillable = [
        'code',
        'regency_id',
        'name',
    ];

    /**
     * Get the regency that owns the district.
     */
    public function regency(): BelongsTo
    {
        return $this->belongsTo(Regency::class);
    }

    /**
     * Get the province through the regency.
     */
    public function province(): BelongsTo
    {
        return $this->belongsTo(Province::class)->through('regency');
    }

    /**
     * Get the villages for the district.
     */
    public function villages(): HasMany
    {
        return $this->hasMany(Village::class);
    }

    /**
     * Get the contents for the district.
     */
    public function contents(): HasMany
    {
        return $this->hasMany(Content::class);
    }
} 