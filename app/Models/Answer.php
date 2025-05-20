<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Answer extends Model
{
    protected $table = 'answers';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'body',
        'question_id',
        'user_id',
        'quiz_id'
    ];

    /**
     * Get the quizz that owns the question.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the quizz that owns the question.
     */
    public function question(): BelongsTo
    {
        return $this->belongsTo(Question::class);
    }

    /**
     * Get the quizz that owns the question.
     */
    public function quizz(): BelongsTo
    {
        return $this->belongsTo(Quiz::class);
    }
}
