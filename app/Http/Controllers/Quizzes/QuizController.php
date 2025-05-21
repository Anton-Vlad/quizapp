<?php

namespace App\Http\Controllers\Quizzes;

use App\Http\Controllers\Controller;
use App\Http\Resources\QuizResource;
use App\Models\Answer;
use App\Models\Question;
use App\Models\Quiz;
use App\Models\QuizProgress;
use App\Models\User;
use App\Services\QuizProgressService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class QuizController extends Controller
{
    /**
     * Show the user's main page.
     */
    public function index(Request $request): Response
    {
        QuizResource::withoutWrapping();
        $user = currentUser();

        $quizzes = Quiz::orderBy('id', 'asc')->get();
        
        return Inertia::render('quizzes', [
            'session' => session()->getId(),
            'quizzes' => QuizResource::collection($quizzes),
        ]);
    }

    /**
     * Show the single quiz page.
     */
    public function single(Request $request, Quiz $quiz, QuizProgressService $quizService)
    {
        QuizResource::withoutWrapping();
        $user = currentUser();

        $quiz_questions = Question::where('quiz_id', $quiz->id)->get();


        $current_quiz_progress = QuizProgress::where('user_id', $user->id)->where('quiz_id', $quiz->id)->first();
        if (!$current_quiz_progress) {
            $current_quiz_progress = QuizProgress::create([
                'user_id' => $user->id,
                'quiz_id' => $quiz->id,
                'current_question_id' => $quiz_questions[0]->id,
            ]);
        }

        $quiz_progress = $quizService->getQuizProgress(
            $current_quiz_progress->current_question_id, 
            collect($quiz_questions)
        );


        $answer = null; //Answer::where('user');
        
        return Inertia::render('single-quiz', [
            'session' => $request->session()->get('status'),
            'quiz' => new QuizResource($quiz),

            'question' => $quiz_progress['current_question'],
            'quiz_progress' => $quiz_progress
        ]);
    }

}