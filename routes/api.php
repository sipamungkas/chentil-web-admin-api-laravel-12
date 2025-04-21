<?php

use App\Http\Controllers\api\IslandController;
use App\Http\Controllers\Api\ProvinceController;
use App\Http\Controllers\Api\RecommendationController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\NewsController;
use App\Http\Controllers\Api\ContentController;
use App\Http\Controllers\Api\FavoriteController;
use App\Http\Controllers\Api\WishlistController;
use App\Http\Controllers\TripController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::put('/profile', [AuthController::class, 'updateProfile']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Protected news routes
    Route::post('/news', [NewsController::class, 'store']);
    Route::put('/news/{news}', [NewsController::class, 'update']);
    Route::delete('/news/{news}', [NewsController::class, 'destroy']);

    // News routes
    Route::get('/news', [NewsController::class, 'index']);
    Route::get('/news/{news}', [NewsController::class, 'show']);

    // Island routes
    Route::get('/islands', [IslandController::class, 'index']);

    // Content routes
    Route::get('/destinations', [ContentController::class, 'destinations']);
    Route::get('/outbounds', [ContentController::class, 'outbounds']);
    Route::get('/cultures', [ContentController::class, 'cultures']);
    Route::get('/food-and-beverages', [ContentController::class, 'foodAndBeverages']);
    Route::get('/top-favorites', [ContentController::class, 'topFavorites']);
    Route::get('/top-favorites-by-category', [ContentController::class, 'topFavoritesByCategory']);
    Route::get('/nearby', [ContentController::class, 'nearby']);

    // Recommendations routes
    Route::get('/recommendations', [RecommendationController::class, 'index']);

    // Favorite routes
    Route::get('/favorites', [FavoriteController::class, 'index']);
    Route::post('/favorites/{content}', [FavoriteController::class, 'toggle']);
    Route::get('/favorites/{content}/check', [FavoriteController::class, 'check']);

    // Wishlist routes
    Route::get('/wishlists', [WishlistController::class, 'index']);
    Route::get('/wishlists/destinations', [WishlistController::class, 'destinations']);
    Route::get('/wishlists/outbounds', [WishlistController::class, 'outbounds']);
    Route::get('/wishlists/cultures', [WishlistController::class, 'cultures']);
    Route::get('/wishlists/fnb', [WishlistController::class, 'foodAndBeverages']);
    Route::post('/wishlists/{content}', [WishlistController::class, 'toggle']);
    Route::get('/wishlists/{content}/check', [WishlistController::class, 'check']);
    Route::get('/wishlists/category-counts', [WishlistController::class, 'categoryCounts']);

    // Trip routes
    Route::get('/trips', [TripController::class, 'index']);
    Route::post('/trips', [TripController::class, 'store']);
    Route::get('/trips/{trip}', [TripController::class, 'show']);
    Route::put('/trips/{trip}', [TripController::class, 'update']);
    Route::delete('/trips/{trip}', [TripController::class, 'destroy']);
    Route::post('/trips/{trip}/contents', [TripController::class, 'addContent']);
    Route::delete('/trips/{trip}/contents/{content}', [TripController::class, 'removeContent']);

    Route::get('/provinces', [ProvinceController::class, 'index']);
});