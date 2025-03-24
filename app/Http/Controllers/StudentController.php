<?php

namespace App\Http\Controllers;

use App\Http\Requests\Student\EditStudent;
use App\Http\Requests\Student\StudentRequest;
use App\Http\Response\Student\StudentResponse;
use App\Models\Student;
use Inertia\Inertia;
use Illuminate\Http\Request;

class StudentController extends Controller
{

    public function dashboardStats()
    {
        try {
            $stats = [
                'totalStudent' => Student::where('is_deleted', false)->count(),
                'maleStudent' => Student::where('is_deleted', false)
                    ->where('gender', 'Male')
                    ->count(),
                'femaleStudent' => Student::where('is_deleted', false)
                    ->where('gender', 'Female')
                    ->count(),
            ];

            return Inertia::render('dashboard', [
                'stats' => $stats,
            ]);
        } catch (\Exception $e) {
            \Log::error('Failed to fetch dashboard stats: ' . $e->getMessage(), [
                'exception' => $e->getTraceAsString(),
            ]);

            return Inertia::render('dashboard', [
                'stats' => [
                    'totalStudent' => 0,
                    'maleStudent' => 0,
                    'femaleStudent' => 0,
                ],
                'errors' => ['message' => 'Failed to fetch dashboard stats']
            ])->withViewData(['status' => 500]);
        }
    }

    public function createFromRegister(StudentRequest $request)
    {
        try {
            $validatedData = $request->validated();

            // Handle file upload if profile_image is present
            if ($request->hasFile('profile_image')) {
                $file = $request->file('profile_image');
                $path = $file->store('profiles', 'public');
                $validatedData['profile_image'] = $path;
            }

            $student = Student::create($validatedData);

        } catch (\Exception $e) {
            \Log::error('Failed to create student: ' . $e->getMessage(), [
                'exception' => $e->getTraceAsString()
            ]);
            return response()->json([
                'errors' => ['message' => 'Failed to create student: ' . $e->getMessage()]
            ], 422);
        }
    }



    public function index(Request $request)
    {
        try {
            $perPage = $request->input('per_page', 20); // Default to 20 items per page
            $search = $request->input('search');
            $department = $request->input('department');
            $status = $request->input('status');

            $query = Student::where('is_deleted', false);

            // Apply filters
            if ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('first_name', 'like', "%{$search}%")
                        ->orWhere('last_name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            }
            if ($department) {
                $query->where('department_name', $department);
            }
            if ($status !== null) {
                $query->where('status', $status); // Assuming status is a field
            }

            $students = $query->paginate($perPage)->appends($request->query());

            $studentResponses = $students->map(function ($student) {
                return (new StudentResponse($student))->toArray();
            });

            return Inertia::render('students', [
                'students' => $studentResponses,
                'meta' => [
                    'current_page' => $students->currentPage(),
                    'last_page' => $students->lastPage(),
                    'per_page' => $students->perPage(),
                    'total' => $students->total(),
                ],
                'filters' => [
                    'search' => $search,
                    'department' => $department,
                    'status' => $status,
                ],
            ]);
        } catch (\Exception $e) {
            \Log::error('Failed to fetch students: ' . $e->getMessage(), [
                'exception' => $e->getTraceAsString(),
            ]);

            return Inertia::render('Students', [
                'students' => [],
                'meta' => [
                    'current_page' => 1,
                    'last_page' => 1,
                    'per_page' => 20,
                    'total' => 0,
                ],
                'filters' => [],
                'errors' => ['message' => 'Unable to fetch students'],
            ])->withViewData(['status' => 500]);
        }
    }


    public function show($id)
    {
        try {
            $student = Student::where('is_deleted', false)
                ->findOrFail($id);

            return response()->json([
                'student' => (new StudentResponse($student))->toArray()
            ]);
        } catch (\Exception $e) {
            \Log::error('Failed to fetch student: ' . $e->getMessage(), [
                'student_id' => $id,
                'exception' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'error' => 'Student not found or unable to fetch'
            ], 404);
        }
    }

    public function update(EditStudent $request, $id)
    {
        try {
            $student = Student::where('is_deleted', false)->findOrFail($id);
            $validated = $request->validated();

            // Handle file upload if profile_image is updated
            if ($request->hasFile('profile_image')) {
                $file = $request->file('profile_image');
                $path = $file->store('profiles', 'public');
                $validated['profile_image'] = $path;
            }

            $student->update($validated);

            return response()->json([
                'success' => 'Student updated successfully!',
            ]);
        } catch (\Exception $e) {
            \Log::error('Failed to update student: ' . $e->getMessage(), [
                'student_id' => $id,
                'request_data' => $request->all(),
                'exception' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'error' => 'Failed to update student',
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $student = Student::where('is_deleted', false)->findOrFail($id);
            $student->update(['is_deleted' => true]);

            return response()->json([
                'success' => 'Student deleted successfully!',
            ]);
        } catch (\Exception $e) {
            \Log::error('Failed to delete student: ' . $e->getMessage(), [
                'student_id' => $id,
                'exception' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'error' => 'Failed to delete student',
            ], 500);
        }
    }

    public function toggleStatus($id)
    {
        try {
            $student = Student::where('is_deleted', false)->findOrFail($id);

            $student->update([
                'is_status' => !$student->is_status,
            ]);

            return redirect()->route('students.index')
                ->with('success', "Student status toggled successfully to " . ($student->is_status ? 'enabled' : 'disabled') . "!");
        } catch (\Exception $e) {
            \Log::error('Failed to toggle student status: ' . $e->getMessage(), [
                'student_id' => $id,
                'exception' => $e->getTraceAsString(),
            ]);

            return redirect()->route('students.index')
                ->withErrors(['message' => 'Failed to toggle student status: ' . $e->getMessage()]);
        }
    }


}
