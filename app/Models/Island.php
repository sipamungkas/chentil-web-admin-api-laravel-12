<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Island extends Model
{
    protected $fillable = [
        'name',
        'description',
        'image',
    ];

    public function provinces(): HasMany
    {
        return $this->hasMany(Province::class);
    }
} 