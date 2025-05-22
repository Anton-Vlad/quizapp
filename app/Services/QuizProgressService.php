<?php

namespace App\Services;

use App\Models\Answer;
use App\Models\Quiz;
use App\Models\User;
use App\Models\QuizProgress;
use Illuminate\Support\Collection;

class QuizProgressService
{
    public function getQuizProgress(int $current_question_id, Collection $questions): array
    {
        $question_ids = (clone $questions)->pluck('id');
        $current_index = $question_ids->search($current_question_id);
        $current_question = (clone $questions)->firstWhere('id', $current_question_id);
        $is_final = $current_index === (count($questions) - 1);

        return [
            'current_question' => $current_question,
            'current_index' => $current_index !== false ? $current_index + 1 : 1,
            'total' => count($question_ids),
            'completed' => $current_index !== false ? $current_index : 0,
            'percent' => $current_index !== false
                ? round(($current_index / count($question_ids)) * 100) . '%'
                : '0%',
            'is_final' => $is_final
        ];
    }

    public function incrementQuizProgress(QuizProgress $progress, Collection $questions): void 
    {
        $question_ids = (clone $questions)->pluck('id');
        $current_index = $question_ids->search($progress->current_question_id);
        $next_index = $current_index + 1;


        if (isset($question_ids[$next_index])) {
            $progress->current_question_id = $question_ids[$next_index];
        }

        $progress->save();
    }

    public function finishQuiz(QuizProgress $progress): void 
    {
        $user_answers = Answer::where('user_id', $progress->user_id)->where('quiz_id', $progress->quiz_id)->with(['question'])->get();

        $score = 0;

        for ($i = 0; $i < count($user_answers); $i++) {
            if ($user_answers[$i]->body === $user_answers[$i]->question->answer) {
                $score += 1;
            }
        }

        $progress->finished_at = now();
        $progress->score = $score;
        $progress->save();
    }
}
