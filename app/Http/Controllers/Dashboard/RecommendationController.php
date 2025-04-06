<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Content;
use App\Models\Recommendation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class RecommendationController extends Controller
{
    /**
     * Display a listing of the recommendations.
     */
    public function index()
    {
        Log::info('Accessing recommendations index');
        try {
            $recommendations = Content::where('recommendation', true)
                ->with([
                    'district:id,name,regency_id',
                    'district.regency:id,name,province_id',
                    'district.regency.province:id,name'
                ])
                ->orderBy('order')
                ->get();

            Log::info('Found recommendations', [
                'count' => $recommendations->count()
            ]);

            return Inertia::render('dashboard/Recommendation/Index', [
                'recommendations' => $recommendations
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to fetch recommendations', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return Inertia::render('dashboard/Recommendation/Index', [
                'recommendations' => [],
                'error' => 'Failed to load recommendations: ' . $e->getMessage()
            ]);
        }
    }

    /**
     * Show the form for creating a new recommendation.
     */
    public function create()
    {
        Log::info('Accessing recommendation creation form');
        return Inertia::render('dashboard/Recommendation/Create');
    }

    /**
     * Store a newly created recommendation in storage.
     */
    public function store(Request $request)
    {
        Log::info('Creating new recommendation', ['request' => $request->all()]);

        $validated = $request->validate([
            'content_id' => 'required|exists:contents,id',
        ]);

        try {
            $content = Content::findOrFail($validated['content_id']);
            $content->update(['recommendation' => true]);

            Log::info('Recommendation created successfully', ['content_id' => $content->id]);
            return redirect()->route('dashboard.recommendations.index')
                ->with('success', 'Content added to recommendations successfully');
        } catch (\Exception $e) {
            Log::error('Failed to create recommendation', [
                'error' => $e->getMessage(),
                'content_id' => $validated['content_id']
            ]);
            return back()->with('error', 'Failed to add content to recommendations');
        }
    }

    /**
     * Display the specified recommendation.
     */
    public function show(Content $recommendation)
    {
        Log::info('Showing recommendation', ['recommendation_id' => $recommendation->id]);
        return Inertia::render('dashboard/Recommendation/Show', [
            'recommendation' => $recommendation
        ]);
    }

    /**
     * Show the form for editing the specified recommendation.
     */
    public function edit(Content $recommendation)
    {
        Log::info('Accessing recommendation edit form', ['recommendation_id' => $recommendation->id]);
        return Inertia::render('dashboard/Recommendation/Edit', [
            'recommendation' => $recommendation
        ]);
    }

    /**
     * Update the specified recommendation in storage.
     */
    public function update(Request $request, Content $recommendation)
    {
        Log::info('Updating recommendation', [
            'recommendation_id' => $recommendation->id,
            'request' => $request->all()
        ]);

        $validated = $request->validate([
            'order' => 'required|integer|min:0',
        ]);

        try {
            $recommendation->update($validated);

            Log::info('Recommendation updated successfully', ['recommendation_id' => $recommendation->id]);
            return redirect()->route('dashboard.recommendations.index')
                ->with('success', 'Recommendation order updated successfully');
        } catch (\Exception $e) {
            Log::error('Failed to update recommendation', [
                'error' => $e->getMessage(),
                'recommendation_id' => $recommendation->id
            ]);
            return back()->with('error', 'Failed to update recommendation order');
        }
    }

    /**
     * Remove the specified recommendation from storage.
     */
    public function destroy(Content $recommendation)
    {
        Log::info('Deleting recommendation', ['recommendation_id' => $recommendation->id]);

        try {
            $recommendation->update(['recommendation' => false]);

            Log::info('Recommendation deleted successfully', ['recommendation_id' => $recommendation->id]);
            return redirect()->route('dashboard.recommendations.index')
                ->with('success', 'Content removed from recommendations successfully');
        } catch (\Exception $e) {
            Log::error('Failed to delete recommendation', [
                'error' => $e->getMessage(),
                'recommendation_id' => $recommendation->id
            ]);
            return back()->with('error', 'Failed to remove content from recommendations');
        }
    }

    /**
     * Update the order of contents in a recommendation.
     */
    public function updateOrder(Request $request)
    {
        Log::info('Updating recommendation order', ['request' => $request->all()]);

        $validated = $request->validate([
            'orders' => 'required|array',
            'orders.*.id' => 'required|exists:contents,id',
            'orders.*.order' => 'required|integer|min:0',
        ]);

        try {
            foreach ($validated['orders'] as $order) {
                Content::where('id', $order['id'])
                    ->where('recommendation', true)
                    ->update(['order' => $order['order']]);
            }

            Log::info('Recommendation order updated successfully');
            return response()->json(['message' => 'Order updated successfully']);
        } catch (\Exception $e) {
            Log::error('Failed to update recommendation order', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Failed to update order'], 500);
        }
    }

    /**
     * Get all contents for selection in recommendation.
     */
    public function getContents(Request $request)
    {
        Log::info('Fetching contents for recommendation selection', ['search' => $request->search]);

        try {
            $query = Content::where('recommendation', false)
                ->with([
                    'district:id,name,regency_id',
                    'district.regency:id,name,province_id',
                    'district.regency.province:id,name'
                ]);

            // Apply search filter if search query is provided
            if ($request->has('search') && !empty($request->search)) {
                $searchTerm = $request->search;
                $query->where(function ($q) use ($searchTerm) {
                    $q->where('title', 'like', "%{$searchTerm}%")
                        ->orWhereHas('district', function ($q) use ($searchTerm) {
                            $q->where('name', 'like', "%{$searchTerm}%")
                                ->orWhereHas('regency', function ($q) use ($searchTerm) {
                                    $q->where('name', 'like', "%{$searchTerm}%")
                                        ->orWhereHas('province', function ($q) use ($searchTerm) {
                                            $q->where('name', 'like', "%{$searchTerm}%");
                                        });
                                });
                        });
                });
            }

            $contents = $query->orderBy('title')->get();

            Log::info('Contents fetched successfully', [
                'count' => $contents->count(),
                'search' => $request->search
            ]);

            return response()->json($contents);
        } catch (\Exception $e) {
            Log::error('Failed to fetch contents', [
                'error' => $e->getMessage(),
                'search' => $request->search,
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json(['error' => 'Failed to fetch contents: ' . $e->getMessage()], 500);
        }
    }
}
