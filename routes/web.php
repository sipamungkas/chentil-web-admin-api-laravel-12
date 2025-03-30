<?php

use App\Http\Controllers\Dashboard\OverviewController;
use App\Http\Middleware\AdminOnly;
use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return redirect('dashboard');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::middleware(AdminOnly::class)->prefix('dashboard')->name('dashboard.')->group(function () {
        Route::get('/', [OverviewController::class, 'index'])->name('index');
        Route::resource('news', \App\Http\Controllers\Dashboard\NewsController::class)->names('news');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
