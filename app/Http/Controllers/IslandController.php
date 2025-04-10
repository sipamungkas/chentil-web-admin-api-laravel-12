<?php

namespace App\Http\Controllers;

use App\Models\Island;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class IslandController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Islands/Index', [
            'islands' => Island::with('provinces')->latest()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Islands/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        Island::create($validated);

        return redirect()->route('islands.index')
            ->with('success', 'Island created successfully.');
    }

    public function edit(Island $island): Response
    {
        return Inertia::render('Islands/Edit', [
            'island' => $island->load('provinces'),
        ]);
    }

    public function update(Request $request, Island $island)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $island->update($validated);

        return redirect()->route('islands.index')
            ->with('success', 'Island updated successfully.');
    }

    public function destroy(Island $island)
    {
        $island->delete();

        return redirect()->route('islands.index')
            ->with('success', 'Island deleted successfully.');
    }
} 