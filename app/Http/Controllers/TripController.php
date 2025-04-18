<?php

namespace App\Http\Controllers;

use App\Models\Trip;
use App\Models\Content;
use App\Http\Resources\TripResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TripController extends Controller
{
    public function index()
    {
        $trips = Trip::where('user_id', Auth::id())->with('contents')->get();
        return TripResource::collection($trips);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);
        $trip = Trip::create([
            'user_id' => Auth::id(),
            'name' => $data['name'],
            'description' => $data['description'] ?? null,
        ]);
        $trip->load('contents');
        return (new TripResource($trip))->response()->setStatusCode(201);
    }

    public function show(Trip $trip)
    {
        $this->authorizeTrip($trip);
        $trip->load('contents');
        return new TripResource($trip);
    }

    public function update(Request $request, Trip $trip)
    {
        $this->authorizeTrip($trip);
        $data = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
        ]);
        $trip->update($data);
        $trip->load('contents');
        return new TripResource($trip);
    }

    public function destroy(Trip $trip)
    {
        $this->authorizeTrip($trip);
        $trip->delete();
        return response()->json(['message' => 'Trip deleted']);
    }

    public function addContent(Request $request, Trip $trip)
    {
        $this->authorizeTrip($trip);
        $data = $request->validate([
            'content_id' => 'required|exists:contents,id',
        ]);
        $trip->contents()->syncWithoutDetaching([$data['content_id']]);
        $trip->load('contents');
        return new TripResource($trip);
    }

    public function removeContent(Trip $trip, Content $content)
    {
        $this->authorizeTrip($trip);
        $trip->contents()->detach($content->id);
        $trip->load('contents');
        return new TripResource($trip);
    }

    private function authorizeTrip(Trip $trip)
    {
        if ($trip->user_id !== Auth::id()) {
            abort(403, 'Unauthorized');
        }
    }
}
