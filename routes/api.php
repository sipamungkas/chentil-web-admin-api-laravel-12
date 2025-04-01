<?php

use App\Http\Controllers\Api\ProvinceController;
use App\Http\Middleware\AdminOnly;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', AdminOnly::class])->group(function () {
    Route::get('/provinces', [ProvinceController::class, 'index']);
    Route::get('/provinces/{province}/regencies', [ProvinceController::class, 'regencies']);
});
