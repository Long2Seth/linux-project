<?php


Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/create', [StudentController::class, 'create'])->name('student.create');
    Route::get('/get-all-students', [StudentController::class, 'index'])->name('student.index');
});
