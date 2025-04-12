<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\District;
use App\Models\Regency;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DistrictController extends Controller
{
    public function index()
    {
        $districts = District::with('regency.province')->paginate(10);
        return Inertia::render('dashboard/Districts/Index', [
            'districts' => $districts
        ]);
    }

    public function create()
    {
        $regencies = Regency::with('province')->get();
        return Inertia::render('dashboard/Districts/Create', [
            'regencies' => $regencies
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|unique:districts',
            'regency_id' => 'required|exists:regencies,id',
            'name' => 'required|string|max:255',
        ]);

        District::create($validated);

        return redirect()
            ->route('dashboard.districts.index')
            ->with('success', 'District created successfully.');
    }

    public function edit(District $district)
    {
        $regencies = Regency::with('province')->get();
        return Inertia::render('dashboard/Districts/Edit', [
            'district' => $district->load('regency.province'),
            'regencies' => $regencies
        ]);
    }

    public function update(Request $request, District $district)
    {
        $validated = $request->validate([
            'code' => 'required|unique:districts,code,' . $district->id,
            'regency_id' => 'required|exists:regencies,id',
            'name' => 'required|string|max:255',
        ]);

        $district->update($validated);

        return redirect()
            ->route('dashboard.districts.index')
            ->with('success', 'District updated successfully.');
    }

    public function destroy(District $district)
    {
        $district->delete();

        return redirect()
            ->route('dashboard.districts.index')
            ->with('success', 'District deleted successfully.');
    }
}