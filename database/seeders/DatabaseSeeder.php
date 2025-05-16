<?php

namespace Database\Seeders;

use App\Models\Question;
use App\Models\Quiz;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $json = File::get(database_path('seeders/data.json'));
        $quizes = json_decode($json, true);

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        // dd($quizzes);
        logger("QUizes", $quizes['quizzes']);

        foreach ($quizes['quizzes'] as $quiz) {

            $quizModel = Quiz::create([
                'title' => $quiz['title'],
                'icon' => $quiz['icon'],
            ]);

            foreach ($quiz['questions'] as $question) {
                Question::create([
                    'body' => $question['question'],
                    'options' => $question['options'],
                    'answer' => $question['answer'],
                    'quiz_id' => $quizModel->id
                ]);
            }
        }
    }
}
