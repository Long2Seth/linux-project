<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Inertia\Inertia;

class StudentController extends Controller
{
    /**
     * Display a listing of all students with all fields.
     */
    public function index()
    {
        try {
            // Fetch all students with all fields
            $students = Student::all();

            // Return the students to the React component
            return Inertia::render('students', [
                'students' => $students,
            ]);
        } catch (\Exception $e) {
            // Log the error and return an error message
            \Log::error('Failed to fetch students: ' . $e->getMessage());
            return Inertia::render('Error', [
                'message' => 'Unable to fetch students: ' . $e->getMessage(),
            ])->withStatus(500);
        }
    }
}
