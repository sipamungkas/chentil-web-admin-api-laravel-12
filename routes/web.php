<?php

use App\Http\Controllers\Dashboard\OverviewController;
use App\Http\Middleware\AdminOnly;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return redirect('dashboard');
})->name('home');

Route::middleware(['auth', 'verified', AdminOnly::class])->group(function () {
    // Route::get('dashboard', function () {
    //     return Inertia::render('dashboard/overview');
    // })->name('dashboard');

    Route::prefix('dashboard')->name('dashboard.')->group(function () {
        Route::get('/', [OverviewController::class, 'index'])->name('index');
        Route::resource('news', \App\Http\Controllers\Dashboard\NewsController::class)->names('news');
        Route::post('news/{news}/toggle-visibility', [\App\Http\Controllers\Dashboard\NewsController::class, 'toggleVisibility'])
            ->name('news.toggle-visibility');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
