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
        ]);

        $perPage = $request->input('per_page', 10);
        $query = Content::foodAndBeverage()
            ->with(['district', 'province.island', 'regency']);

        if ($request->has('island_id')) {
            $query->whereHas('province', function ($query) use ($request) {
                $query->where('island_id', $request->input('island_id'));
            });
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
}
