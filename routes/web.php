<?php

use App\Http\Controllers\StudentController;
use App\Http\Controllers\StudentRegisterController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/about', function () {
    return Inertia::render('about');
})->name('about');

Route::get('/contact', function () {
    return Inertia::render('contact');
})->name('contact');
Route::get('/register-student', function () {
    return Inertia::render('register-student');
})->name('register-student');

Route::post('/register-student', [StudentRegisterController::class, 'store'])->name('register-student.store');
Route::get('/student/create', [StudentRegisterController::class, 'create'])->name('student.create');

// routes/web.php

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', [StudentController::class, 'dashboardStats'])
        ->name('dashboard');
    Route::prefix('user')->name('user.')->group(function () {
        Route::get('/', [StudentRegisterController::class, 'index'])->name('index');
        Route::patch('/{id}/disable', [StudentRegisterController::class, 'disableStudent'])->name('disable');
        Route::patch('/{id}/enable', [StudentRegisterController::class, 'enableStudent'])->name('enable');
    });

    Route::prefix('students')->name('students.')->group(function () {
        Route::get('/', [StudentController::class, 'index'])->name('index');
        Route::post('/', [StudentController::class, 'store'])->name('store');
        Route::get('/{id}', [StudentController::class, 'show'])->name('show');
        Route::patch('/{id}', [StudentController::class, 'update'])->name('update');
        Route::delete('/{id}', [StudentController::class, 'destroy'])->name('destroy');
        Route::patch('/{id}/toggle-status', [StudentController::class, 'toggleStatus'])
            ->name('toggle');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

