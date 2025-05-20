<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class QuizProgress extends Model
{
    protected $table = 'quiz_user';

    protected $fillable = [
        'session_id',
        'user_id',
        'quiz_id',
        'current_question_id',
        'score',
        'finished_at'
    ];

    /**
     * Get the user that owns the sterted quiz.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function quiz(): BelongsTo
    {
        return $this->belongsTo(Quiz::class);
    }
}
