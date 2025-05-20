<?php

namespace App\Services;

use App\Models\Quiz;
use App\Models\User;
use App\Models\QuizProgress;

class QuizProgressService
{
    public function getUserQuizProgress(User $user, Quiz $quiz = null)
    {
        // return QuizProgress::firstOrCreate([
        //     'user_id' => $user
        // ])
    }
}