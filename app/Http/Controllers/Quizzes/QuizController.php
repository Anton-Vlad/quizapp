<?php

namespace App\Http\Controllers\Quizzes;

use App\Http\Controllers\Controller;
use App\Http\Resources\QuizResource;
use App\Models\Question;
use App\Models\Quiz;
use App\Models\QuizProgress;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class QuizController extends Controller
{
    /**
     * Show the user's main page.
     */
    public function index(Request $request): Response
    {
        $user_session_id = $request->user_session_id;
        $user_id = $request->user_id;

        QuizResource::withoutWrapping();
        $quizzes = Quiz::orderBy('id', 'asc')->get();
        
        return Inertia::render('quizzes', [
            'session' => $request->session()->get('status'),
            'anonUserId' => $user_session_id, 
            'userId' => $user_id, 
            'quizzes' => QuizResource::collection($quizzes),

        ]);
    }

    /**
     * Show the single quiz page.
     */
    public function single(Request $request, Quiz $quiz)
    {
        $user_session_id = $request->user_session_id;
        $user_id = $request->user_id;

        $quiz_questions = Question::where('quiz_id', $quiz->id)->get();
        $current_question = $quiz_questions[0];

        QuizResource::withoutWrapping();

        if ($user_session_id) {
            $current_quiz_progress = QuizProgress::where('session_id', $user_session_id)->where('quiz_id', $quiz->id)->first();

            if (!$current_quiz_progress) {

             
                QuizProgress::create([
                    'user_id' => null,
                    'session_id' => $user_session_id,
                    'quiz_id' => $quiz->id,
                    'current_question_id' => $current_question->id,
                ]);
            }
        }

        
        return Inertia::render('single-quiz', [
            'session' => $request->session()->get('status'),
            'anonUserId' => $user_session_id, 
            'userId' => $user_id,
            'quiz' => new QuizResource($quiz),
            'question' => $current_question,
            'quiz_progress' => [1, count($quiz_questions)]
        ]);
    }

}