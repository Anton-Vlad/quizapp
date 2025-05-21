<?php


namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class UserContextService
{
    public function getOrCreateCurrentUser(): User
    {
        if (Auth::check()) {
            return Auth::user();
        }

        $session_id = session()->getId();

        // Try finding user by session ID
        $user = User::where('session_id', $session_id)->first();

        if (!$user) {
            // Create anonymous user for the session
            $user = User::create([
                'name' => fake()->name(),
                'email' => 'guest_' . Str::random(10) . '@guest.local',
                'password' => bcrypt(Str::random(12)),
                'session_id' => $session_id,
            ]);
        }

        return $user;
    }
}
