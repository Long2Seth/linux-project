<?php

namespace App\Http\Controllers;

use App\Http\Requests\Student\StudentRequest;
use App\Http\Requests\Student\EditStudent;
use App\Models\Student;
use Carbon\Carbon;
use Inertia\Inertia;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function dashboardStats()
    {
        try {
            $totalStudent = Student::where('is_deleted', false)->count();
            $maleStudent = Student::where('is_deleted', false)
                ->where('gender', 'male')
                ->count();
            $femaleStudent = Student::where('is_deleted', false)
                ->where('gender', 'female')
                ->count();

            // Get chart data
            return Inertia::render('dashboard', [
                'stats' => [
                    'totalStudent' => $totalStudent,
                    'maleStudent' => $maleStudent,
                    'femaleStudent' => $femaleStudent,
                ],
            ]);
        } catch (\Exception $e) {
            \Log::error('Failed to fetch dashboard stats: ' . $e->getMessage(), [
                'exception' => $e->getTraceAsString(),
            ]);
        }
    }

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
                $query->where('department_name', $department);
            }

            if ($status !== null) {
                $query->where('status', $status === 'true' ? 1 : 0);
            }

            $query->where('is_deleted', false);

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

    public function show($id)
    {
        try {
            $student = Student::where('is_deleted', false)->findOrFail($id);
            // Return JSON response for API call instead of Inertia render
            return response()->json([
                'student' => $student
            ]);
        } catch (\Exception $e) {
            \Log::error('Failed to fetch student: ' . $e->getMessage(), [
                'student_id' => $id,
                'exception' => $e->getTraceAsString(),
            ]);
            return response()->json([
                'error' => 'Student not found'
            ], 404);
        }
    }


    public function update(EditStudent $request, $id)
    {
        try {
            $student = Student::where('is_deleted', false)->findOrFail($id);
            $validated = $request->validated();

            // Handle date formatting
            if (isset($validated['date_of_birth'])) {
                $validated['date_of_birth'] = Carbon::parse($validated['date_of_birth'])->toDateString();
            }
            if (isset($validated['start_date'])) {
                $validated['start_date'] = Carbon::parse($validated['start_date'])->toDateString();
            }
            if (isset($validated['end_date'])) {
                $validated['end_date'] = Carbon::parse($validated['end_date'])->toDateString();
            }

            $student->update($validated);

        } catch (\Exception $e) {
            \Log::error('Failed to update student: ' . $e->getMessage(), [
                'student_id' => $id,
                'request_data' => $request->all(),
                'exception' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'error' => 'Failed to update student: ' . $e->getMessage()
            ], 400);
        }
    }
    public function toggleStatus(Request $request, $id)
    {
        try {
            $student = Student::where('is_deleted', false)->findOrFail($id);
            $student->status = !$student->status;
            $student->save();

            return redirect()->route('students.index')->with('success', 'Student status updated successfully!');
        } catch (\Exception $e) {
            \Log::error('Failed to toggle student status: ' . $e->getMessage(), [
                'student_id' => $id,
                'exception' => $e->getTraceAsString(),
            ]);

            return redirect()->back()->withErrors(['error' => 'Failed to toggle student status: ' . $e->getMessage()]);
        }
    }

    public function destroy($id)
    {
        try {
            $student = Student::where('is_deleted', false)->findOrFail($id);
            $student->is_deleted = true;
            $student->save();

            return redirect()->route('students.index')->with('success', 'Student deleted successfully!');
        } catch (\Exception $e) {
            \Log::error('Failed to mark student as deleted: ' . $e->getMessage(), [
                'student_id' => $id,
                'exception' => $e->getTraceAsString(),
            ]);

            return redirect()->back()->withErrors(['error' => 'Failed to delete student: ' . $e->getMessage()]);
        }
    }
}
