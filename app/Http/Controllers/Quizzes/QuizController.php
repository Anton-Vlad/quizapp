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
        $user = getTheCurrentUser();

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
        $user = getTheCurrentUser();

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

        if($quiz_progress['is_final']) {
            return Inertia::render('quiz-feedback', [
                'session' => $request->session()->get('status'),
                'quiz' => new QuizResource($quiz),
                'quiz_progress' => $quiz_progress,
                'quiz_feedback' => $current_quiz_progress
            ]);
        }

        return Inertia::render('single-quiz', [
            'session' => $request->session()->get('status'),
            'quiz' => new QuizResource($quiz),

            'question' => $quiz_progress['current_question'],
            'quiz_progress' => $quiz_progress
        ]);
    }


    /**
     * Submit a quiz question answer
     */
    public function submit(Request $request, Quiz $quiz, QuizProgressService $quizService)
    {
        QuizResource::withoutWrapping();
        $user = getTheCurrentUser();
        $validated = $request->validate([
            'answer' => ['required', 'string'],
        ], [
            'answer.required' => 'Please select an answer'
        ]);

        $quiz_questions = Question::where('quiz_id', $quiz->id)->get();
        $progress = QuizProgress::where('user_id', $user->id)->where('quiz_id', $quiz->id)->firstOrFail();
        $quiz_progress = $quizService->getQuizProgress(
            $progress->current_question_id,
            collect($quiz_questions)
        );

        // Store the user's answer
        Answer::updateOrCreate(
            [
                'user_id' => $user->id,
                'quiz_id' => $quiz->id,
                'question_id' => $progress->current_question_id,
            ],
            [
                'body' => $validated['answer'],
            ]
        );

        return Inertia::render('single-quiz', [
            'session' => $request->session()->get('status'),
            'quiz' => new QuizResource($quiz),

            'question' => $quiz_progress['current_question'],
            'quiz_progress' => $quiz_progress,

            'answer_feedback' => $quiz_progress['current_question']->answer === $validated['answer'],
            'corrent_answer' => $quiz_progress['current_question']->answer
        ]);
    }

    /**
     * Submit a quiz question answer
     */
    public function next(Request $request, Quiz $quiz, QuizProgressService $quizService)
    {
        QuizResource::withoutWrapping();
        $user = getTheCurrentUser();

        $quiz_questions = Question::where('quiz_id', $quiz->id)->get();
        $current_quiz_progress = QuizProgress::where('user_id', $user->id)->where('quiz_id', $quiz->id)->firstOrFail();

        $quiz_progress = $quizService->getQuizProgress(
            $current_quiz_progress->current_question_id,
            collect($quiz_questions)
        );

        if ($quiz_progress['is_final']) {
            $quizService->finishQuiz($current_quiz_progress);
            
            return Inertia::render('quiz-feedback', [
                'session' => $request->session()->get('status'),
                'quiz' => new QuizResource($quiz),
                'quiz_progress' => $quiz_progress,
                'quiz_feedback' => $current_quiz_progress
            ]);
        }

        $quizService->incrementQuizProgress($current_quiz_progress, $quiz_questions);
        $quiz_progress = $quizService->getQuizProgress(
            $current_quiz_progress->current_question_id,
            collect($quiz_questions)
        );

        return Inertia::render('single-quiz', [
            'session' => $request->session()->get('status'),
            'quiz' => new QuizResource($quiz),

            'question' => $quiz_progress['current_question'],
            'quiz_progress' => $quiz_progress
        ]);
    }
}
