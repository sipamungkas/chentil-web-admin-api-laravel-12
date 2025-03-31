<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Regency extends Model
{
    protected $fillable = [
        'code',
        'province_id',
        'name',
    ];

    /**
     * Get the province that owns the regency.
     */
    public function province(): BelongsTo
    {
        return $this->belongsTo(Province::class);
    }

    /**
     * Get the districts for the regency.
     */
    public function districts(): HasMany
    {
        return $this->hasMany(District::class);
    }

    /**
     * Get all villages in this regency through districts.
     */
    public function villages(): HasMany
    {
        return $this->hasManyThrough(Village::class, District::class);
    }
} 