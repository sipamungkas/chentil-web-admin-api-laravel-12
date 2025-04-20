<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Province;
use App\Models\Regency;
use App\Http\Resources\ProvinceCollection;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProvinceController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $provinces = Province::orderBy('name')->paginate($perPage);
        return new ProvinceCollection($provinces);
    }

    public function regencies(Province $province): JsonResponse
    {
        $isAdmin = auth()->user()->role;
        if (!$isAdmin) {
            return response()->json([
                "status" => "error",
                "message" => "Unauthorized access!"
            ]);
        }
        ;
        $regencies = $province->regencies()->orderBy('name')->get();
        return response()->json($regencies);
    }

    public function districts(Regency $regency): JsonResponse
    {
        $isAdmin = auth()->user()->role;
        if (!$isAdmin) {
            return response()->json([
                "status" => "error",
                "message" => "Unauthorized access!"
            ]);
        }
        ;
        $districts = $regency->districts()->orderBy('name')->get();
        return response()->json($districts);
    }

}