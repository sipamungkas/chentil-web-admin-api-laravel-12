<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Province;
use Illuminate\Http\JsonResponse;

class ProvinceController extends Controller
{
    public function index(): JsonResponse
    {
        $isAdmin = auth()->user()->role;
        if (!$isAdmin) {
            return response()->json([
                "status" => "error",
                "message" => "Unauthorized access!"
            ]);
        }
        ;
        $provinces = Province::orderBy('name')->get();
        return response()->json($provinces);
    }

    public function regencies(Province $province): JsonResponse
    {
        $regencies = $province->regencies()->orderBy('name')->get();
        return response()->json($regencies);
    }
}