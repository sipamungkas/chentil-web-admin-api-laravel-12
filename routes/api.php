<?php

use App\Http\Controllers\Api\ProvinceController;
use Illuminate\Support\Facades\Route;

Route::middleware(['web'])->group(function () {
    Route::get('/provinces', [ProvinceController::class, 'index']);
    Route::get('/provinces/{province}/regencies', [ProvinceController::class, 'regencies']);
});