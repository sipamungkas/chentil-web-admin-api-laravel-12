<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\IslandCollection;
use App\Models\Island;
use Illuminate\Http\Request;

class IslandController extends Controller
{
    /**
     * Display a paginated listing of the news.
     *
     * @param Request $request
     * @return IslandCollection
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $islands = Island::orderBy('name', 'asc')
            ->paginate($perPage);

        return new IslandCollection($islands);
    }
}
