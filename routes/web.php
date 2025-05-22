<?php

use App\Http\Controllers\Quizzes\QuizController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('welcome');
// })->name('home');


Route::get('/', [QuizController::class, 'index'])->name('home');
Route::get('/quizzes', [QuizController::class, 'index'])->name('quizzes');
Route::get('/quiz/{quiz}', [QuizController::class, 'single'])->name('quiz');
Route::get('/quiz/{quiz}/next', [QuizController::class, 'single'])->name('quiz.next');
Route::post('/quiz/{quiz}', [QuizController::class, 'submit'])->name('question.submit');
Route::post('/quiz/{quiz}/next', [QuizController::class, 'next'])->name('question.next');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
