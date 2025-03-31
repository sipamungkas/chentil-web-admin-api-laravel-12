<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Content;
use App\Models\District;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ContentController extends Controller
{
    public function destinations()
    {
        return Inertia::render('Dashboard/Content/Index', [
            'title' => 'Destinations',
            'category' => Content::CATEGORY_DESTINATION,
            'contents' => Content::destination()
                ->with('district')
                ->orderBy('order')
                ->paginate(10),
        ]);
    }

    public function outbounds()
    {
        return Inertia::render('Dashboard/Content/Index', [
            'title' => 'Outbound Activities',
            'category' => Content::CATEGORY_OUTBOUND,
            'contents' => Content::outbound()
                ->with('district')
                ->orderBy('order')
                ->paginate(10),
        ]);
    }

    public function cultures()
    {
        return Inertia::render('Dashboard/Content/Index', [
            'title' => 'Cultural Heritage',
            'category' => Content::CATEGORY_CULTURE,
            'contents' => Content::culture()
                ->with('district')
                ->orderBy('order')
                ->paginate(10),
        ]);
    }

    public function foodAndBeverages()
    {
        return Inertia::render('Dashboard/Content/Index', [
            'title' => 'Food & Beverages',
            'category' => Content::CATEGORY_FOOD_AND_BEVERAGE,
            'contents' => Content::foodAndBeverage()
                ->with('district')
                ->orderBy('order')
                ->paginate(10),
        ]);
    }

    public function create(Request $request)
    {
        return Inertia::render('Dashboard/Content/Create', [
            'title' => 'Create ' . ucfirst($request->category),
            'category' => $request->category,
            'districts' => District::orderBy('name')->get(),
        ]);
    }

    public function store(Request $request)
    {
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

        Content::create($validated);

        return redirect()->route("dashboard.{$request->category}s.index")
            ->with('success', ucfirst($request->category) . ' created successfully.');
    }

    public function edit(Content $content)
    {
        return Inertia::render('Dashboard/Content/Edit', [
            'title' => 'Edit ' . ucfirst($content->category),
            'content' => $content,
            'districts' => District::orderBy('name')->get(),
        ]);
    }

    public function update(Request $request, Content $content)
    {
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

        return redirect()->route("dashboard.{$content->category}s.index")
            ->with('success', ucfirst($content->category) . ' updated successfully.');
    }

    public function destroy(Content $content)
    {
        $category = $content->category;

        if ($content->image) {
            Storage::disk('public')->delete($content->image);
        }

        $content->delete();

        return redirect()->route("dashboard.{$category}s.index")
            ->with('success', ucfirst($category) . ' deleted successfully.');
    }

    public function toggleVisibility(Content $content)
    {
        $content->update(['is_visible' => !$content->is_visible]);

        return back()->with('success', 'Visibility updated successfully.');
    }

    public function show(Content $content)
    {
        return Inertia::render('Dashboard/Content/Show', [
            'title' => ucfirst($content->category) . ' Details',
            'content' => $content->load('district'),
        ]);
    }
}
