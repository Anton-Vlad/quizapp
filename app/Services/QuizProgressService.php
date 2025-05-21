<?php

namespace App\Services;

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

        return [
            'current_question' => $current_question,
            'current_index' => $current_index !== false ? $current_index + 1 : 1,
            'total' => count($question_ids),
            'completed' => $current_index !== false ? $current_index : 0,
            'percent' => $current_index !== false
                ? round(($current_index / count($question_ids)) * 100) . '%'
                : '0%',
        ];
    }
}
