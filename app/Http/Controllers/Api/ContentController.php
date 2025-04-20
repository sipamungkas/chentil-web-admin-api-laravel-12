<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ContentCollection;
use App\Models\Content;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class ContentController extends Controller
{
    /**
     * Display a paginated listing of destinations.
     *
     * @param Request $request
     * @return ContentCollection
     */
    public function destinations(Request $request)
    {
        Log::info('API: Fetching destinations', [
            'category' => Content::CATEGORY_DESTINATION,
            'island_id' => $request->input('island_id'),
        ]);

        $perPage = $request->input('per_page', 10);
        $query = Content::destination()
            ->with(['district', 'province.island', 'regency']);

        if ($request->has('island_id')) {
            $query->whereHas('province', function ($query) use ($request) {
                $query->where('island_id', $request->input('island_id'));
            });
        }

        $contents = $query
            ->orderBy('order')
            ->paginate($perPage);

        Log::info('API: Found destinations', [
            'count' => $contents->count(),
            'total' => $contents->total(),
        ]);

        return new ContentCollection($contents);
    }

    /**
     * Display a paginated listing of outbound activities.
     *
     * @param Request $request
     * @return ContentCollection
     */
    public function outbounds(Request $request)
    {
        Log::info('API: Fetching outbounds', [
            'category' => Content::CATEGORY_OUTBOUND,
            'island_id' => $request->input('island_id'),
        ]);

        $perPage = $request->input('per_page', 10);
        $query = Content::outbound()
            ->with(['district', 'province.island', 'regency']);

        if ($request->has('island_id')) {
            $query->whereHas('province', function ($query) use ($request) {
                $query->where('island_id', $request->input('island_id'));
            });
        }

        $contents = $query
            ->orderBy('order')
            ->paginate($perPage);

        Log::info('API: Found outbounds', [
            'count' => $contents->count(),
            'total' => $contents->total(),
        ]);

        return new ContentCollection($contents);
    }

    /**
     * Display a paginated listing of cultural heritage.
     *
     * @param Request $request
     * @return ContentCollection
     */
    public function cultures(Request $request)
    {
        Log::info('API: Fetching cultures', [
            'category' => Content::CATEGORY_CULTURE,
            'island_id' => $request->input('island_id'),
        ]);

        $perPage = $request->input('per_page', 10);
        $query = Content::culture()
            ->with(['district', 'province.island', 'regency']);

        if ($request->has('island_id')) {
            $query->whereHas('province', function ($query) use ($request) {
                $query->where('island_id', $request->input('island_id'));
            });
        }

        $contents = $query
            ->orderBy('order')
            ->paginate($perPage);

        Log::info('API: Found cultures', [
            'count' => $contents->count(),
            'total' => $contents->total(),
        ]);

        return new ContentCollection($contents);
    }

    /**
     * Display a paginated listing of food and beverages.
     *
     * @param Request $request
     * @return ContentCollection
     */
    public function foodAndBeverages(Request $request)
    {
        Log::info('API: Fetching food and beverages', [
            'category' => Content::CATEGORY_FOOD_AND_BEVERAGE,
            'island_id' => $request->input('island_id'),
            'province_id' => $request->input('province_id'),
        ]);

        $perPage = $request->input('per_page', 10);
        $query = Content::foodAndBeverage()
            ->with(['district', 'province.island', 'regency']);

        if ($request->has('island_id')) {
            $query->whereHas('province', function ($query) use ($request) {
                $query->where('island_id', $request->input('island_id'));
            });
        }

        // Support filtering by a single province_id
        if ($request->filled('province_id')) {
            $query->where('province_id', $request->input('province_id'));
        }

        $contents = $query
            ->orderBy('order')
            ->paginate($perPage);

        Log::info('API: Found food and beverages', [
            'count' => $contents->count(),
            'total' => $contents->total(),
        ]);

        return new ContentCollection($contents);
    }

    /**
     * Get top 5 most favorited content.
     *
     * @param Request $request
     * @return ContentCollection
     */
    public function topFavorites(Request $request)
    {
        Log::info('API: Fetching top favorited content');

        $category = $request->input('category');
        $query = Content::withCount('favoritedBy')
            ->with(['district', 'province.island', 'regency'])
            ->having('favorited_by_count', '>', 0);

        // Filter by category if provided
        if ($category) {
            $query->where('category', $category);
        }

        $contents = $query->orderByDesc('favorited_by_count')
            ->limit(5)
            ->get();

        Log::info('API: Found top favorited content', [
            'count' => $contents->count(),
            'category' => $category,
        ]);

        return new ContentCollection($contents);
    }

    /**
     * Get top 5 most favorited content by category.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function topFavoritesByCategory(Request $request)
    {
        Log::info('API: Fetching top favorited content by category');

        $contents = Content::withCount('favoritedBy')
            ->with(['district', 'province.island', 'regency'])
            ->having('favorited_by_count', '>', 0)
            ->orderByDesc('favorited_by_count')
            ->limit(5)
            ->get();

        Log::info('API: Found top favorited content by category', [
            'topPicks' => $contents
        ]);

        return response()->json([
            'status' => 'success',
            'data' => $contents
        ]);
    }
}
