<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminOnly
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // if (!$request->user() || !$request->user()->isAdmin()) {
        //     if ($request->expectsJson()) {
        //         return response()->json(['message' => 'Unauthorized. Admin access required.'], 403);
        //     }

        //     return redirect()->route('home')->with('error', 'You do not have permission to access this area.');
        // }
        if (!$request->user() || $request->user()->role !== 'admin') {
            return redirect()->route('home')->with('error', 'No Permission');
        }

        return $next($request);
    }
}
