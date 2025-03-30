<?php

namespace App\Http\Controllers\dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
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
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('dashboard/news/create', [
            'title' => 'Create News',
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): Response
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'status' => 'required|in:draft,published',
        ]);

        // TODO: Implement news creation logic

        return redirect()->route('dashboard.news.index')
            ->with('success', 'News created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): Response
    {
        return Inertia::render('dashboard/news/show', [
            'title' => 'View News',
            'news' => [], // TODO: Implement news retrieval logic
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): Response
    {
        return Inertia::render('dashboard/news/edit', [
            'title' => 'Edit News',
            'news' => [], // TODO: Implement news retrieval logic
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): Response
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'status' => 'required|in:draft,published',
        ]);

        // TODO: Implement news update logic

        return redirect()->route('dashboard.news.index')
            ->with('success', 'News updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): Response
    {
        // TODO: Implement news deletion logic

        return redirect()->route('dashboard.news.index')
            ->with('success', 'News deleted successfully.');
    }
}
