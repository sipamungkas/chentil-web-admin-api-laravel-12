<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\News;
use File;
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
        return Inertia::render('dashboard/news/index', [
            'title' => 'News Management',
            'news' => News::orderBy('order')->paginate(10),
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

        // dd($request->file('image'));

        if ($request->hasFile('image')) {
            $fileName = time() . '.' . $request->file('image')->extension();
            $request->file('image')->move(public_path('images'), $fileName);
            $validated['image'] = "/images/$fileName";
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
            // Delete old image if exists
            if ($news->image) {
                $isExist = File::exists(public_path('') . $news->image);
                if ($isExist) {
                    unlink(public_path('') . $news->image);
                }
            }
            $fileName = time() . '.' . $request->file('image')->extension();
            $request->file('image')->move(public_path('images'), $fileName);
            $validated['image'] = "/images/$fileName";
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
        // dd('tes', Storage::disk('public') . '.' . $news->image);
        if ($news->image) {
            $isExist = File::exists(public_path('') . $news->image);
            if ($isExist) {
                unlink(public_path('') . $news->image);
            }
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
