<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ContentCollection;
use App\Models\Content;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class FavoriteController extends Controller
{
    /**
     * Display a paginated listing of the user's favorite contents.
     *
     * @param Request $request
     * @return ContentCollection
     */
    public function index(Request $request)
    {
        Log::info('API: Fetching user favorites', [
            'user_id' => $request->user()->id,
        ]);

        $perPage = $request->input('per_page', 10);
        $contents = $request->user()
            ->favorites()
            ->with(['district', 'province.island', 'regency'])
            ->orderBy('favorites.created_at', 'desc')
            ->paginate($perPage);

        Log::info('API: Found favorites', [
            'count' => $contents->count(),
            'total' => $contents->total(),
        ]);

        return new ContentCollection($contents);
    }

    /**
     * Toggle favorite status for a content.
     *
     * @param Request $request
     * @param Content $content
     * @return \Illuminate\Http\JsonResponse
     */
    public function toggle(Request $request, Content $content)
    {
        $user = $request->user();
        $isFavorited = $user->favorites()->where('content_id', $content->id)->exists();

        if ($isFavorited) {
            $user->favorites()->detach($content->id);
            $message = 'Content removed from favorites';
        } else {
            $user->favorites()->attach($content->id);
            $message = 'Content added to favorites';
        }

        Log::info('API: Toggled favorite status', [
            'user_id' => $user->id,
            'content_id' => $content->id,
            'is_favorited' => !$isFavorited,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => $message,
            'is_favorited' => !$isFavorited
        ]);
    }

    /**
     * Check if a content is favorited by the user.
     *
     * @param Request $request
     * @param Content $content
     * @return \Illuminate\Http\JsonResponse
     */
    public function check(Request $request, Content $content)
    {
        $isFavorited = $request->user()
            ->favorites()
            ->where('content_id', $content->id)
            ->exists();

        return response()->json([
            'status' => 'success',
            'data' => [

                'is_favorited' => $isFavorited
            ]
        ]);
    }
}