<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Island;
use App\Models\Province;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;

class IslandController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->input('search');
        
        $islands = Island::withCount('provinces')
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('dashboard/Islands/Index', [
            'islands' => $islands,
            'filters' => [
                'search' => $search,
            ],
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
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('islands', 'public');
            $validated['image'] = $path;
        }

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
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($island->image) {
                Storage::disk('public')->delete($island->image);
            }
            
            $path = $request->file('image')->store('islands', 'public');
            $validated['image'] = $path;
        }

        $island->update($validated);

        return redirect()->route('dashboard.islands.index')
            ->with('success', 'Island updated successfully.');
    }

    public function destroy(Island $island)
    {
        // Delete image if exists
        if ($island->image) {
            Storage::disk('public')->delete($island->image);
        }

        $island->delete();

        return redirect()->route('dashboard.islands.index')
            ->with('success', 'Island deleted successfully.');
    }

    public function provinces(Request $request, Island $island): Response
    {
        $search = $request->input('search');
        
        $availableProvinces = Province::whereNull('island_id')
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('code', 'like', "%{$search}%");
                });
            })
            ->orderBy('name')
            ->get();

        $assignedProvinces = $island->provinces()
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('code', 'like', "%{$search}%");
                });
            })
            ->orderBy('name')
            ->get();

        return Inertia::render('dashboard/Islands/Provinces', [
            'island' => [
                'id' => $island->id,
                'name' => $island->name,
                'provinces' => $assignedProvinces,
            ],
            'availableProvinces' => $availableProvinces,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function addProvince(Request $request, Island $island)
    {
        $validated = $request->validate([
            'province_id' => 'required|exists:provinces,id',
        ]);

        $province = Province::findOrFail($validated['province_id']);
        
        // Check if province is already assigned to another island
        if ($province->island_id && $province->island_id !== $island->id) {
            return back()->with('error', 'Province is already assigned to another island.');
        }

        $province->update(['island_id' => $island->id]);

        return back()->with('success', 'Province added to island successfully.');
    }

    public function removeProvince(Request $request, Island $island)
    {
        $validated = $request->validate([
            'province_id' => 'required|exists:provinces,id',
        ]);

        $province = Province::findOrFail($validated['province_id']);
        
        // Only remove if the province belongs to this island
        if ($province->island_id === $island->id) {
            $province->update(['island_id' => null]);
            return back()->with('success', 'Province removed from island successfully.');
        }

        return back()->with('error', 'Province does not belong to this island.');
    }
}