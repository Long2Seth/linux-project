<?php

namespace App\Http\Controllers;

use App\Http\Requests\Student\StudentRequest;
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

            if ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('first_name', 'like', "%{$search}%")
                        ->orWhere('last_name', 'like', "%{$search}%");
                });
            }

            if ($department) {
                $query->where('department', $department);
            }

            if ($status !== null) {
                $query->where('status', $status === 'true' ? 1 : 0);
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

    public function store(StudentRequest $request)
    {
        try {
            $validated = $request->validated();
            $student = Student::create($validated);

            return redirect()->route('students.index')->with('success', 'Student created successfully!');
        } catch (\Exception $e) {
            \Log::error('Failed to create student: ' . $e->getMessage(), [
                'request_data' => $request->all(),
                'validated_data' => $request->validated(),
                'exception' => $e->getTraceAsString(),
            ]);

            return redirect()->back()->withErrors([
                'error' => 'Failed to create student: ' . $e->getMessage(),
            ])->withInput();
        }
    }

}
