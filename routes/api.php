<?php

use App\Http\Controllers\api\IslandController;
use App\Http\Controllers\Api\RecommendationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\NewsController;
use App\Http\Controllers\Api\ContentController;

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
    Route::post('/logout', [AuthController::class, 'logout']);

    // News routes
    Route::get('/news', [NewsController::class, 'index']);
    Route::get('/news/{news}', [NewsController::class, 'show']);
    Route::post('/news', [NewsController::class, 'store']);
    Route::put('/news/{news}', [NewsController::class, 'update']);
    Route::delete('/news/{news}', [NewsController::class, 'destroy']);

    // Island routes
    Route::get('/islands', [IslandController::class, 'index']);

    // Content routes
    Route::get('/destinations', [ContentController::class, 'destinations']);
    Route::get('/outbounds', [ContentController::class, 'outbounds']);
    Route::get('/cultures', [ContentController::class, 'cultures']);
    Route::get('/food-and-beverages', [ContentController::class, 'foodAndBeverages']);

    // Island routes
    Route::get('/islands', [IslandController::class, 'index']);

    // Recommendations routes
    Route::get('/recommendations', [RecommendationController::class, 'index']);
});