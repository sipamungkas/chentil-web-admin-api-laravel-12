<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Content;
use App\Models\District;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ContentController extends Controller
{
    public function destinations()
    {
        Log::info('Fetching destinations', [
            'category' => Content::CATEGORY_DESTINATION,
        ]);

        $contents = Content::destination()
            ->with('district')
            ->orderBy('order')
            ->paginate(10);

        Log::info('Found destinations', [
            'count' => $contents->count(),
            'total' => $contents->total(),
        ]);

        return Inertia::render('dashboard/Content/Index', [
            'title' => 'Destinations',
            'category' => Content::CATEGORY_DESTINATION,
            'contents' => $contents,
        ]);
    }

    public function outbounds()
    {
        Log::info('Fetching outbounds', [
            'category' => Content::CATEGORY_OUTBOUND,
        ]);

        $contents = Content::outbound()
            ->with('district')
            ->orderBy('order')
            ->paginate(10);

        Log::info('Found outbounds', [
            'count' => $contents->count(),
            'total' => $contents->total(),
        ]);

        return Inertia::render('dashboard/Content/Index', [
            'title' => 'Outbound Activities',
            'category' => Content::CATEGORY_OUTBOUND,
            'contents' => $contents,
        ]);
    }

    public function cultures()
    {
        Log::info('Fetching cultures', [
            'category' => Content::CATEGORY_CULTURE,
        ]);

        $contents = Content::culture()
            ->with('district')
            ->orderBy('order')
            ->paginate(10);

        Log::info('Found cultures', [
            'count' => $contents->count(),
            'total' => $contents->total(),
        ]);

        return Inertia::render('dashboard/Content/Index', [
            'title' => 'Cultural Heritage',
            'category' => Content::CATEGORY_CULTURE,
            'contents' => $contents,
        ]);
    }

    public function foodAndBeverages()
    {
        Log::info('Fetching food and beverages', [
            'category' => Content::CATEGORY_FOOD_AND_BEVERAGE,
        ]);

        $contents = Content::foodAndBeverage()
            ->with('district')
            ->orderBy('order')
            ->paginate(10);

        Log::info('Found food and beverages', [
            'count' => $contents->count(),
            'total' => $contents->total(),
        ]);

        return Inertia::render('dashboard/Content/Index', [
            'title' => 'Food & Beverages',
            'category' => Content::CATEGORY_FOOD_AND_BEVERAGE,
            'contents' => $contents,
        ]);
    }

    public function create(Request $request)
    {
        Log::info('Creating content', [
            'category' => $request->category,
        ]);

        return Inertia::render('dashboard/Content/Create', [
            'title' => 'Create ' . ucfirst($request->category),
            'category' => $request->category,
            'districts' => District::with('regency')->orderBy('name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        Log::info('Storing content', [
            'category' => $request->category,
        ]);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string|in:' . implode(',', [
                Content::CATEGORY_DESTINATION,
                Content::CATEGORY_OUTBOUND,
                Content::CATEGORY_CULTURE,
                Content::CATEGORY_FOOD_AND_BEVERAGE,
            ]),
            'district_id' => 'nullable|exists:districts,id',
            'image' => 'nullable|image|max:2048',
            'since_century' => 'nullable|integer|min:1|max:21',
            'established_year' => 'nullable|integer|min:1800|max:' . date('Y'),
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'order' => 'nullable|integer|min:0',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('content-images', 'public');
        }

        $content = Content::create($validated);

        Log::info('Content created', [
            'id' => $content->id,
            'category' => $content->category,
        ]);

        return redirect()->route("dashboard.{$request->category}s.index")
            ->with('success', ucfirst($request->category) . ' created successfully.');
    }

    public function edit(Content $content)
    {
        Log::info('Editing content', [
            'id' => $content->id,
            'category' => $content->category,
        ]);

        return Inertia::render('dashboard/Content/Edit', [
            'title' => 'Edit ' . ucfirst($content->category),
            'content' => $content,
            'districts' => District::orderBy('name')->get(),
        ]);
    }

    public function update(Request $request, Content $content)
    {
        Log::info('Updating content', [
            'id' => $content->id,
            'category' => $content->category,
        ]);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'district_id' => 'nullable|exists:districts,id',
            'image' => 'nullable|image|max:2048',
            'since_century' => 'nullable|integer|min:1|max:21',
            'established_year' => 'nullable|integer|min:1800|max:' . date('Y'),
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'order' => 'nullable|integer|min:0',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($content->image) {
                Storage::disk('public')->delete($content->image);
            }
            $validated['image'] = $request->file('image')->store('content-images', 'public');
        }

        $content->update($validated);

        Log::info('Content updated', [
            'id' => $content->id,
            'category' => $content->category,
        ]);

        return redirect()->route("dashboard.{$content->category}s.index")
            ->with('success', ucfirst($content->category) . ' updated successfully.');
    }

    public function destroy(Content $content)
    {
        Log::info('Deleting content', [
            'id' => $content->id,
            'category' => $content->category,
        ]);

        $category = $content->category;

        if ($content->image) {
            Storage::disk('public')->delete($content->image);
        }

        $content->delete();

        Log::info('Content deleted', [
            'id' => $content->id,
            'category' => $category,
        ]);

        return redirect()->route("dashboard.{$category}s.index")
            ->with('success', ucfirst($category) . ' deleted successfully.');
    }

    public function toggleVisibility(Content $content)
    {
        Log::info('Toggling content visibility', [
            'id' => $content->id,
            'category' => $content->category,
            'current_visibility' => $content->is_visible,
        ]);

        $content->update(['is_visible' => !$content->is_visible]);

        Log::info('Content visibility toggled', [
            'id' => $content->id,
            'category' => $content->category,
            'new_visibility' => !$content->is_visible,
        ]);

        return back()->with('success', 'Visibility updated successfully.');
    }

    public function show(Content $content)
    {
        Log::info('Showing content', [
            'id' => $content->id,
            'category' => $content->category,
        ]);

        return Inertia::render('dashboard/Content/Show', [
            'title' => ucfirst($content->category) . ' Details',
            'content' => $content->load('district'),
        ]);
    }
}
