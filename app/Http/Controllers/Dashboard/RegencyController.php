<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Province;
use App\Models\Regency;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RegencyController extends Controller
{
    public function index()
    {
        $regencies = Regency::with('province')->paginate(10);
        return Inertia::render('dashboard/Regencies/Index', [
            'regencies' => $regencies
        ]);
    }

    public function create()
    {
        $provinces = Province::all();
        return Inertia::render('dashboard/Regencies/Create', [
            'provinces' => $provinces
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|unique:regencies',
            'province_id' => 'required|exists:provinces,id',
            'name' => 'required|string|max:255',
        ]);

        Regency::create($validated);

        return redirect()
            ->route('dashboard.regencies.index')
            ->with('success', 'Regency created successfully.');
    }

    public function edit(Regency $regency)
    {
        $provinces = Province::all();
        return Inertia::render('dashboard/Regencies/Edit', [
            'regency' => $regency->load('province'),
            'provinces' => $provinces
        ]);
    }

    public function update(Request $request, Regency $regency)
    {
        $validated = $request->validate([
            'code' => 'required|unique:regencies,code,' . $regency->id,
            'province_id' => 'required|exists:provinces,id',
            'name' => 'required|string|max:255',
        ]);

        $regency->update($validated);

        return redirect()
            ->route('dashboard.regencies.index')
            ->with('success', 'Regency updated successfully.');
    }

    public function destroy(Regency $regency)
    {
        $regency->delete();

        return redirect()
            ->route('dashboard.regencies.index')
            ->with('success', 'Regency deleted successfully.');
    }
}