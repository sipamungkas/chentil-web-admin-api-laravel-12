<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\NewsCollection;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class NewsController extends Controller
{
    /**
     * Display a paginated listing of the news.
     *
     * @param Request $request
     * @return NewsCollection
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $news = News::visible()
            ->ordered()
            ->paginate($perPage);

        return new NewsCollection($news);
    }

    /**
     * Store a newly created news in storage.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            // Accept image as file upload
            'image' => 'nullable|file|image|max:5120', // 5MB max
            'is_visible' => 'boolean',
            'order' => 'integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->all();

        // Handle image upload to S3
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $path = $file->store('news-images', 's3');
            // Optionally make the file public and get the URL
            $url = Storage::disk('s3')->url($path);
            $data['image'] = $url;
        }

        $news = News::create($data);

        return response()->json([
            'status' => 'success',
            'message' => 'News created successfully',
            'data' => $news
        ], 201);
    }

    /**
     * Display the specified news.
     *
     * @param News $news
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(News $news)
    {
        return response()->json([
            'status' => 'success',
            'data' => $news
        ]);
    }

    /**
     * Update the specified news in storage.
     *
     * @param Request $request
     * @param News $news
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, News $news)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'string|max:255',
            'description' => 'string',
            'image' => 'nullable|string|max:255',
            'is_visible' => 'boolean',
            'order' => 'integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $news->update($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'News updated successfully',
            'data' => $news
        ]);
    }

    /**
     * Remove the specified news from storage.
     *
     * @param News $news
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(News $news)
    {
        $news->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'News deleted successfully'
        ]);
    }
}
