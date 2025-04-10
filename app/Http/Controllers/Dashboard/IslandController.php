<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Island;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class IslandController extends Controller
{
    public function index(): Response
    {
        $islands = Island::withCount('provinces')
            ->latest()
            ->paginate(10);

        return Inertia::render('dashboard/Islands/Index', [
            'islands' => $islands
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('dashboard/Islands/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        Island::create($validated);

        return redirect()->route('dashboard.islands.index')
            ->with('success', 'Island created successfully.');
    }

    public function edit(Island $island): Response
    {
        return Inertia::render('dashboard/Islands/Edit', [
            'island' => $island
        ]);
    }

    public function update(Request $request, Island $island)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        $island->update($validated);

        return redirect()->route('dashboard.islands.index')
            ->with('success', 'Island updated successfully.');
    }

    public function destroy(Island $island)
    {
        $island->delete();

        return redirect()->route('dashboard.islands.index')
            ->with('success', 'Island deleted successfully.');
    }
}