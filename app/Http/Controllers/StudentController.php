<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Inertia\Inertia;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function index(Request $request)
    {
        try {
            $perPage = $request->input('per_page', 20);
            $page = $request->input('page', 1);
            $search = $request->input('search');
            $department = $request->input('department');
            $status = $request->input('status');

            $query = Student::query();

            // Apply search filter
            if ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('first_name', 'like', "%{$search}%")
                        ->orWhere('last_name', 'like', "%{$search}%");
                });
            }

            // Apply department filter
            if ($department) {
                $query->where('department_name', $department);
            }

            // Apply status filter
            if ($status) {
                $query->where('status', $status);
            }

            $students = $query->paginate($perPage, ['*'], 'page', $page);

            return Inertia::render('students', [
                'students' => $students->items(),
                'meta' => [
                    'current_page' => $students->currentPage(),
                    'last_page' => $students->lastPage(),
                    'per_page' => $students->perPage(),
                    'total' => $students->total(),
                ],
            ]);
        } catch (\Exception $e) {
            \Log::error('Failed to fetch students: ' . $e->getMessage());
            return Inertia::render('Error', [
                'message' => 'Unable to fetch students at this time.',
            ])->withStatus(500);
        }
    }
}
