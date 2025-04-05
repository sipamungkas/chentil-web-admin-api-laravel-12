<?php

use App\Http\Controllers\Api\ProvinceController;
use App\Http\Controllers\Dashboard\ContentController;
use App\Http\Controllers\Dashboard\OverviewController;
use App\Http\Middleware\AdminOnly;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::get('/', function () {
    return redirect('dashboard');
})->name('home');

Route::get('/unauthorized', function () {
    return Inertia::render('Unauthorized');
})->name('unauthorized');

Route::middleware(['auth', 'verified', AdminOnly::class])->group(function () {
    // Route::get('dashboard', function () {
    //     return Inertia::render('dashboard/overview');
    // })->name('dashboard');

    Route::prefix('dashboard')->name('dashboard.')->group(function () {
        Route::get('/', [OverviewController::class, 'index'])->name('index');
        Route::resource('news', \App\Http\Controllers\Dashboard\NewsController::class)->names('news');
        Route::post('news/{news}/toggle-visibility', [\App\Http\Controllers\Dashboard\NewsController::class, 'toggleVisibility'])
            ->name('news.toggle-visibility');

        // Destinations
        Route::get('/destinations', [ContentController::class, 'destinations'])->name('destinations.index');
        Route::get('/destinations/create', [ContentController::class, 'create'])->defaults('category', 'destination')->name('destinations.create');
        Route::get('/destinations/{content}', [ContentController::class, 'show'])->name('destinations.show');
        Route::get('/destinations/{content}/edit', [ContentController::class, 'edit'])->name('destinations.edit');

        // Outbound Activities
        Route::get('/outbounds', [ContentController::class, 'outbounds'])->name('outbounds.index');
        Route::get('/outbounds/create', [ContentController::class, 'create'])->defaults('category', 'outbound')->name('outbounds.create');
        Route::get('/outbounds/{content}', [ContentController::class, 'show'])->name('outbounds.show');
        Route::get('/outbounds/{content}/edit', [ContentController::class, 'edit'])->name('outbounds.edit');

        // Cultural Heritage
        Route::get('/cultures', [ContentController::class, 'cultures'])->name('cultures.index');
        Route::get('/cultures/create', [ContentController::class, 'create'])->defaults('category', 'culture')->name('cultures.create');
        Route::get('/cultures/{content}', [ContentController::class, 'show'])->name('cultures.show');
        Route::get('/cultures/{content}/edit', [ContentController::class, 'edit'])->name('cultures.edit');

        // Food & Beverages
        Route::get('/food-and-beverages', [ContentController::class, 'foodAndBeverages'])->name('food-and-beverages.index');
        Route::get('/food-and-beverages/create', [ContentController::class, 'create'])->defaults('category', 'food_and_beverage')->name('food-and-beverages.create');
        Route::get('/food-and-beverages/{content}', [ContentController::class, 'show'])->name('food-and-beverages.show');
        Route::get('/food-and-beverages/{content}/edit', [ContentController::class, 'edit'])->name('food-and-beverages.edit');

        // Common content routes
        Route::post('/contents', [ContentController::class, 'store'])->name('contents.store');
        Route::put('/contents/{content}', [ContentController::class, 'update'])->name('contents.update');
        Route::delete('/contents/{content}', [ContentController::class, 'destroy'])->name('contents.destroy');
        Route::post('/contents/{content}/toggle-visibility', [ContentController::class, 'toggleVisibility'])->name('contents.toggle-visibility');

        // location

        Route::get('/provinces', [ProvinceController::class, 'index'])->name("province");
        Route::get('/provinces/{province}/regencies', [ProvinceController::class, 'regencies'])->name('regency');
        Route::get('/regencies/{regency}/districts', [ProvinceController::class, 'districts'])->name('districts');

    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
