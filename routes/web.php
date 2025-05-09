<?php

use App\Http\Controllers\Api\ProvinceController;
use App\Http\Controllers\Dashboard\ContentController;
use App\Http\Controllers\Dashboard\EventController;
use App\Http\Controllers\Dashboard\IslandController;
use App\Http\Controllers\Dashboard\OverviewController;
use App\Http\Controllers\Dashboard\ProvinceController as DashboardProvinceController;
use App\Http\Controllers\Dashboard\RecommendationController;
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
    Route::prefix('dashboard')->name('dashboard.')->group(function () {
        Route::get('/', [OverviewController::class, 'index'])->name('index');
        Route::resource('news', \App\Http\Controllers\Dashboard\NewsController::class)->names('news');
        Route::post('news/{news}/toggle-visibility', [\App\Http\Controllers\Dashboard\NewsController::class, 'toggleVisibility'])
            ->name('news.toggle-visibility');

        // Islands and Provinces
        Route::resource('islands', IslandController::class);
        Route::get('islands/{island}/provinces', [IslandController::class, 'provinces'])->name('islands.provinces');
        Route::post('islands/{island}/provinces', [IslandController::class, 'addProvince'])->name('islands.provinces.add');
        Route::post('islands/{island}/provinces/remove', [IslandController::class, 'removeProvince'])->name('islands.provinces.remove');

        // Standalone provinces
        Route::get('provinces-menu', [DashboardProvinceController::class, 'index'])->name('provinces-menu.index');
        Route::get('provinces-menu/create', [DashboardProvinceController::class, 'create'])->name('provinces-menu.create');
        Route::post('provinces-menu', [DashboardProvinceController::class, 'store'])->name('provinces-menu.store');
        Route::get('provinces-menu/{province}/edit', [DashboardProvinceController::class, 'edit'])->name('provinces-menu.edit');
        Route::put('provinces-menu/{province}', [DashboardProvinceController::class, 'update'])->name('provinces-menu.update');
        Route::delete('provinces-menu/{province}', [DashboardProvinceController::class, 'destroy'])->name('provinces-menu.destroy');

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
        Route::get('/fnbs', [ContentController::class, 'foodAndBeverages'])->name('fnbs.index');
        Route::get('/fnbs/create', [ContentController::class, 'create'])->defaults('category', 'fnb')->name('fnbs.create');
        Route::get('/fnbs/{content}', [ContentController::class, 'show'])->name('fnbs.show');
        Route::get('/fnbs/{content}/edit', [ContentController::class, 'edit'])->name('fnbs.edit');

        // Content CRUD
        Route::post('/contents', [ContentController::class, 'store'])->name('contents.store');
        Route::put('/contents/{content}', [ContentController::class, 'update'])->name('contents.update');
        Route::delete('/contents/{content}', [ContentController::class, 'destroy'])->name('contents.destroy');
        Route::post('/contents/{content}/toggle-visibility', [ContentController::class, 'toggleVisibility'])->name('contents.toggle-visibility');

        // Recommendations
        Route::get('/recommendations', [RecommendationController::class, 'index'])->name('recommendations.index');
        Route::get('/recommendations/create', [RecommendationController::class, 'create'])->name('recommendations.create');
        Route::post('/recommendations', [RecommendationController::class, 'store'])->name('recommendations.store');
        Route::get('/recommendations/contents', [RecommendationController::class, 'getContents'])->name('recommendations.contents');
        Route::put('/recommendations/update-order', [RecommendationController::class, 'updateOrder'])->name('recommendations.update-order');
        Route::get('/recommendations/{recommendation}', [RecommendationController::class, 'show'])->name('recommendations.show');
        Route::get('/recommendations/{recommendation}/edit', [RecommendationController::class, 'edit'])->name('recommendations.edit');
        Route::put('/recommendations/{recommendation}', [RecommendationController::class, 'update'])->name('recommendations.update');
        Route::delete('/recommendations/{recommendation}', [RecommendationController::class, 'destroy'])->name('recommendations.destroy');

        // location
        Route::get('/provinces', [ProvinceController::class, 'index'])->name('province');
        Route::get('/provinces/{province}/regencies', [ProvinceController::class, 'regencies'])->name('regency');
        Route::get('/regencies/{regency}/districts', [ProvinceController::class, 'districts'])->name('districts');

        // Calendar routes
        Route::get('/calendar', [EventController::class, 'index'])->name('calendar');
        Route::get('/events', [EventController::class, 'getEvents'])->name('events.index');
        Route::post('/events', [EventController::class, 'store'])->name('events.store');
        Route::put('/events/{event}', [EventController::class, 'update'])->name('events.update');
        Route::delete('/events/{event}', [EventController::class, 'destroy'])->name('events.destroy');

        // Location Management
        Route::resource('districts', \App\Http\Controllers\Dashboard\DistrictController::class);
        Route::get('/districts/{district}/regency', [App\Http\Controllers\Dashboard\DistrictController::class, 'regency']);
        Route::resource('regencies', \App\Http\Controllers\Dashboard\RegencyController::class);
        Route::resource('villages', \App\Http\Controllers\Dashboard\VillageController::class);
    });
});

// Landing page route
Route::get('/', function () {
    return Inertia::render('Landing');
})->name('landing');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
