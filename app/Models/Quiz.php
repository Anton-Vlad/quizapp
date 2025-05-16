<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Quiz extends Model
{
    protected $table = 'quizzes';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'icon',
        'color'
    ];

    /**
     * Get the questions for the quizz.
     */
    public function questions(): HasMany
    {
        return $this->hasMany(Question::class);
    }
}
