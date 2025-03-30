<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OverviewController extends Controller
{
    //
    public function index()
    {
        $userCount = User::whereNot('role', 'admin')->count();

        return Inertia::render('dashboard/overview', [
            'userCount' => $userCount,
            'title' => 'Overview',
        ]);
    }
}
