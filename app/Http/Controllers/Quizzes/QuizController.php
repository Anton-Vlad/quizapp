<?php

namespace App\Http\Controllers\Quizzes;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use App\Models\Quiz;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class QuizController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function index(Request $request): Response
    {
        $user_session_id = $request->user_session_id;
        $user_id = $request->user_id;

        $quizzes = Quiz::orderBy('id', 'asc')->get();

        $quiz = $quizzes[1];
        
        return Inertia::render('quizzes', [
            'session' => $request->session()->get('status'),
            'anonUserId' => $user_session_id, 
            'userId' => $user_id, 
            'quizzes' => $quizzes,
            'quiz' => $quiz
        ]);
    }

}