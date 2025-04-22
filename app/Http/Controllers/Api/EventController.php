<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Event;
use Illuminate\Http\JsonResponse;

class EventController extends Controller
{
    /**
     * Display a listing of all event dates.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $events = Event::orderBy('start_date')->get(['start_date', 'title']);
        $markedDates = [];
        foreach ($events as $event) {
            $date = $event->start_date->toDateString();
            $markedDates[$date] = [
                'selected' => false,
                'marked' => true,
                'selectedColor' => '#E16FAB',
                'event' => $event->title
            ];
        }
        return response()->json([
            'data' => $markedDates
        ]);
    }
}
