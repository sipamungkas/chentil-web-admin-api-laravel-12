<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ContentCollection;
use App\Models\Content;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class WishlistController extends Controller
{
    /**
     * Display a paginated listing of the user's wishlisted contents by category.
     *
     * @param Request $request
     * @return ContentCollection
     */
    public function index(Request $request)
    {
        $category = $request->input('category');
        Log::info('API: Fetching user wishlists', [
            'user_id' => $request->user()->id,
            'category' => $category,
        ]);

        $perPage = $request->input('per_page', 10);
        $query = $request->user()->wishlists()
            ->with(['district', 'province.island', 'regency']);

        // Filter by category if provided
        if ($category) {
            $query->where('category', $category);
        }

        $contents = $query->orderBy('wishlists.created_at', 'desc')
            ->paginate($perPage);

        Log::info('API: Found wishlists', [
            'count' => $contents->count(),
            'total' => $contents->total(),
            'category' => $category,
        ]);

        return new ContentCollection($contents);
    }

    /**
     * Display user's wishlisted destinations.
     *
     * @param Request $request
     * @return ContentCollection
     */
    public function destinations(Request $request)
    {
        $request->merge(['category' => Content::CATEGORY_DESTINATION]);
        return $this->index($request);
    }

    /**
     * Display user's wishlisted outbound activities.
     *
     * @param Request $request
     * @return ContentCollection
     */
    public function outbounds(Request $request)
    {
        $request->merge(['category' => Content::CATEGORY_OUTBOUND]);
        return $this->index($request);
    }

    /**
     * Display user's wishlisted cultural heritage.
     *
     * @param Request $request
     * @return ContentCollection
     */
    public function cultures(Request $request)
    {
        $request->merge(['category' => Content::CATEGORY_CULTURE]);
        return $this->index($request);
    }

    /**
     * Display user's wishlisted food and beverages.
     *
     * @param Request $request
     * @return ContentCollection
     */
    public function foodAndBeverages(Request $request)
    {
        $request->merge(['category' => Content::CATEGORY_FOOD_AND_BEVERAGE]);
        return $this->index($request);
    }

    /**
     * Toggle wishlist status for a content.
     *
     * @param Request $request
     * @param Content $content
     * @return \Illuminate\Http\JsonResponse
     */
    public function toggle(Request $request, Content $content)
    {
        $user = $request->user();

        $isWishlisted = $user->wishlists()->where('content_id', $content->id)->exists();

        if ($isWishlisted) {
            $user->wishlists()->detach($content->id);
            $message = 'Content removed from wishlist';
        } else {
            $user->wishlists()->attach($content->id);
            $message = 'Content added to wishlist';
        }

        Log::info('API: Toggled wishlist status', [
            'user_id' => $user->id,
            'content_id' => $content->id,
            'is_wishlisted' => !$isWishlisted,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => $message,
            'is_wishlisted' => !$isWishlisted
        ]);
    }

    /**
     * Check if a content is wishlisted by the user.
     *
     * @param Request $request
     * @param Content $content
     * @return \Illuminate\Http\JsonResponse
     */
    public function check(Request $request, Content $content)
    {
        $wishlist = $request->user()
            ->wishlists()
            ->where('content_id', $content->id)
            ->first();

        return response()->json([
            'status' => 'success',
            'data' => [
                'is_wishlisted' => !is_null($wishlist),
            ]
        ]);
    }


}