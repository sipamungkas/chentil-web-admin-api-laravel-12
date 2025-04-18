<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ContentCollection;
use App\Models\Content;
use Illuminate\Http\Request;

class RecommendationController extends Controller
{
    /**
     * Display a paginated listing of the news.
     *
     * @param Request $request
     * @return ContentCollection
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $recommendations = Content::where('recommendation', true)
            ->with([
                'district:id,name,regency_id',
                'district.regency:id,name,province_id',
                'district.regency.province:id,name'
            ])
            ->orderBy('title', 'asc')
            ->paginate($perPage);


        return new ContentCollection($recommendations);
    }
}
