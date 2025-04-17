<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ContentCollection;
use App\Models\Content;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

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
        ]);

        $perPage = $request->input('per_page', 10);
        $contents = Content::destination()
            ->with(['district', 'province', 'regency'])
            ->visible()
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
        ]);

        $perPage = $request->input('per_page', 10);
        $contents = Content::outbound()
            ->with(['district', 'province', 'regency'])
            ->visible()
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
        ]);

        $perPage = $request->input('per_page', 10);
        $contents = Content::culture()
            ->with(['district', 'province', 'regency'])
            ->visible()
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
        ]);

        $perPage = $request->input('per_page', 10);
        $contents = Content::foodAndBeverage()
            ->with(['district', 'province', 'regency'])
            ->visible()
            ->orderBy('order')
            ->paginate($perPage);

        Log::info('API: Found food and beverages', [
            'count' => $contents->count(),
            'total' => $contents->total(),
        ]);

        return new ContentCollection($contents);
    }
}
