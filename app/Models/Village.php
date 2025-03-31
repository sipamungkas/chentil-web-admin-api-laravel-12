<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Village extends Model
{
    protected $fillable = [
        'code',
        'district_id',
        'name',
    ];

    /**
     * Get the district that owns the village.
     */
    public function district(): BelongsTo
    {
        return $this->belongsTo(District::class);
    }

    /**
     * Get the regency through the district.
     */
    public function regency(): BelongsTo
    {
        return $this->belongsTo(Regency::class)->through('district');
    }

    /**
     * Get the province through the district and regency.
     */
    public function province(): BelongsTo
    {
        return $this->belongsTo(Province::class)->through('district.regency');
    }
} 