<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\District;
use App\Models\Village;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VillageController extends Controller
{
    public function index()
    {
        $villages = Village::with('district.regency.province')->paginate(10);
        return Inertia::render('dashboard/Villages/Index', [
            'villages' => $villages
        ]);
    }

    public function create()
    {
        return Inertia::render('dashboard/Villages/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|unique:villages',
            'district_id' => 'required|exists:districts,id',
            'name' => 'required|string|max:255',
        ]);

        Village::create($validated);

        return redirect()
            ->route('dashboard.villages.index')
            ->with('success', 'Village created successfully.');
    }

    public function edit(Village $village)
    {
        return Inertia::render('dashboard/Villages/Edit', [
            'village' => $village->load('district.regency.province'),
        ]);
    }

    public function update(Request $request, Village $village)
    {
        $validated = $request->validate([
            'code' => 'required|unique:villages,code,' . $village->id,
            'district_id' => 'required|exists:districts,id',
            'name' => 'required|string|max:255',
        ]);

        $village->update($validated);

        return redirect()
            ->route('dashboard.villages.index')
            ->with('success', 'Village updated successfully.');
    }

    public function destroy(Village $village)
    {
        $village->delete();

        return redirect()
            ->route('dashboard.villages.index')
            ->with('success', 'Village deleted successfully.');
    }
}