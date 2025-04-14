<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Content;
use App\Models\District;
use App\Models\Island;
use App\Models\News;
use App\Models\Province;
use App\Models\Regency;
use App\Models\User;
use App\Models\Village;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OverviewController extends Controller
{
    //
    public function index()
    {
        $userCount = User::whereNot('role', 'admin')->count();
        $newsCount = News::count();
        $outboundCount = Content::where('category', 'outbound')->count();
        $cultureCount = Content::where('category', 'culture')->count();
        $destinationCount = Content::where('category', 'destination')->count();
        $foodAndBeverageCount = Content::where('category', 'food_and_beverate')->count();
        $islandCount = Island::count();
        $provinceCount = Province::count();
        $regencyCount = Regency::count();
        $districtCount = District::count();
        $villageCount = Village::count();


        // 'destination', 'outbound', 'culture', 'food_and_beverage'

        return Inertia::render('dashboard/overview', [
            'userCount' => $userCount,
            'newsCount' => $newsCount,
            'outboundCount' => $outboundCount,
            'cultureCount' => $cultureCount,
            'destinationCount' => $destinationCount,
            'foodAndBeverageCount' => $foodAndBeverageCount,
            'islandCount' => $islandCount,
            'provinceCount' => $provinceCount,
            'regencyCount' => $regencyCount,
            'districtCount' => $districtCount,
            'villageCount' => $villageCount,
            'title' => 'Overview',
        ]);
    }
}
