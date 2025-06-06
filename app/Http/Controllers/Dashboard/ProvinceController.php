<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Island;
use App\Models\Province;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProvinceController extends Controller
{
    // Standalone provinces
    public function index()
    {
        $provinces = Province::with('island')
            ->latest()
            ->paginate(10);

        return Inertia::render('dashboard/Provinces/Index', [
            'provinces' => $provinces
        ]);
    }

    public function create(): Response
    {
        $islands = Island::all();
        return Inertia::render('dashboard/Provinces/Create', [
            'islands' => $islands
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'island_id' => 'nullable|exists:islands,id'
        ]);

        Province::create($validated);

        return redirect()
            ->route('dashboard.provinces-menu.index')
            ->with('success', 'Province created successfully.');
    }

    public function edit(Province $province): Response
    {
        $islands = Island::all();
        return Inertia::render('dashboard/Provinces/Edit', [
            'province' => $province,
            'islands' => $islands
        ]);
    }

    public function update(Request $request, Province $province)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'island_id' => 'nullable|exists:islands,id'
        ]);

        $province->update($validated);

        return redirect()
            ->route('dashboard.provinces-menu.index')
            ->with('success', 'Province updated successfully.');
    }

    public function destroy(Province $province)
    {
        $province->delete();

        return redirect()
            ->route('dashboard.provinces-menu.index')
            ->with('success', 'Province deleted successfully.');
    }

    // Island-specific provinces
    public function islandIndex(Island $island): Response
    {
        $provinces = $island
            ->provinces()
            ->with('island')
            ->latest()
            ->paginate(10);

        return Inertia::render('dashboard/Provinces/Index', [
            'island' => $island,
            'provinces' => $provinces
        ]);
    }

    public function islandCreate(Island $island): Response
    {
        $islands = Island::all();
        return Inertia::render('dashboard/Provinces/Create', [
            'island' => $island,
            'islands' => $islands
        ]);
    }

    public function islandStore(Request $request, Island $island)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'island_id' => 'nullable|exists:islands,id'
        ]);

        $island->provinces()->create($validated);

        return redirect()
            ->route('dashboard.islands.provinces.index', $island)
            ->with('success', 'Province created successfully.');
    }

    public function islandEdit(Island $island, Province $province): Response
    {
        $islands = Island::all();
        return Inertia::render('Provinces/Edit', [
            'island' => $island,
            'province' => $province,
            'islands' => $islands
        ]);
    }

    public function islandUpdate(Request $request, Island $island, Province $province)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'island_id' => 'nullable|exists:islands,id'
        ]);

        $province->update($validated);

        return redirect()
            ->route('dashboard.islands.provinces.index', $island)
            ->with('success', 'Province updated successfully.');
    }

    public function islandDestroy(Island $island, Province $province)
    {
        $province->delete();

        return redirect()
            ->route('dashboard.islands.provinces.index', $island)
            ->with('success', 'Province deleted successfully.');
    }
}
