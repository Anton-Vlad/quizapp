<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Symfony\Component\HttpFoundation\Response;

class IdentifyUserOrSession
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        $userId = Auth::id();
        if ($userId) {
            $request->merge(['user_id' => $userId, 'user_session_id' => null]);
        } else {

            if (!$request->session()->has('anon_user_id')) {
                $anonId = (string) Str::uuid();
                $request->session()->put('anon_user_id', $anonId);

                if (!$request->hasCookie('anon_user_id')) {
                    Cookie::queue('anon_user_id', $anonId, 60 * 24 * 30); // 30 days
                }
            }

            $sessionId = $request->session()->get('anon_user_id');
            $request->merge(['user_id' => null, 'user_session_id' => $sessionId]);
        }

        return $next($request);
    }
}
