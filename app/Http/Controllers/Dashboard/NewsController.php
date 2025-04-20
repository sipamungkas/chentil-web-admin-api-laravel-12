<?php

namespace App\Http\Controllers\Dashboard;

use App\Helpers\S3Helper;
use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $news = News::orderBy('order')->paginate(10);
        // Add full S3 image URLs to each news item
        $news->getCollection()->transform(function ($item) {
            $item->image = S3Helper::getS3ImageUrl($item->image ?? null);
            return $item;
        });
        return Inertia::render('dashboard/news/index', [
            'title' => 'News Management',
            'news' => $news,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('dashboard/news/Create', [
            'title' => 'Create News',
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'is_visible' => 'boolean',
            'order' => 'integer',
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $path = $file->store('news-images', 's3');
            $validated['image'] = $path;
        }

        News::create($validated);

        return redirect()->route('dashboard.news.index')
            ->with('success', 'News created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(News $news): Response
    {
        $news->image = S3Helper::getS3ImageUrl($news->image ?? null);
        return Inertia::render('dashboard/news/Show', [
            'title' => 'View News',
            'news' => $news,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(News $news): Response
    {
        $news->image = S3Helper::getS3ImageUrl($news->image ?? null);
        return Inertia::render('dashboard/news/Edit', [
            'title' => 'Edit News',
            'news' => $news,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, News $news)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'is_visible' => 'boolean',
            'order' => 'integer',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image from S3 if it exists and is an S3 URL
            if ($news->image) {
                Storage::disk('s3')->delete($news->image);
            }
            $file = $request->file('image');
            $path = $file->store('news-images', 's3');
            $validated['image'] = $path;
        }

        $news->update($validated);

        return redirect()->route('dashboard.news.index')
            ->with('success', 'News updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(News $news)
    {
        // Optionally, delete image from S3 if needed
        if ($news->image) {
            Storage::disk('s3')->delete($news->image);
        }

        $news->delete();

        return redirect()->route('dashboard.news.index')
            ->with('success', 'News deleted successfully.');
    }

    /**
     * Toggle news visibility.
     */
    public function toggleVisibility(News $news)
    {
        $news->update([
            'is_visible' => !$news->is_visible,
        ]);

        return back()->with('success', 'News visibility updated successfully.');
    }
}
