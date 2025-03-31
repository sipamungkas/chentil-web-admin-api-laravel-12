<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Province extends Model
{
    protected $fillable = [
        'code',
        'name',
    ];

    /**
     * Get the regencies for the province.
     */
    public function regencies(): HasMany
    {
        return $this->hasMany(Regency::class);
    }

    /**
     * Get all districts in this province through regencies.
     */
    public function districts(): HasMany
    {
        return $this->hasManyThrough(District::class, Regency::class);
    }

    /**
     * Get all villages in this province through districts and regencies.
     */
    public function villages(): HasMany
    {
        return $this->hasManyThrough(Village::class, District::class);
    }
} 