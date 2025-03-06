<?php
namespace App\Http\Controllers;

use App\Http\Response\Student\StudentResponse;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function index(Request $request)
    {
        try {
            $query = Student::query();

            // Filter by name (first_name or last_name)
            if ($request->has('name') && !empty($request->input('name'))) {
                $name = $request->input('name');
                $query->where(function ($q) use ($name) {
                    $q->where('first_name', 'like', "%{$name}%")
                        ->orWhere('last_name', 'like', "%{$name}%");
                });
            }

            // Filter by department
            if ($request->has('department') && $request->input('department') !== 'all') {
                $query->where('department', $request->input('department'));
            }

            // Filter by status
            if ($request->has('status') && $request->input('status') !== 'all') {
                $query->where('status', $request->input('status'));
            }

            // Pagination parameters
            $perPage = $request->input('per_page', 20);
            $students = $query->paginate($perPage);

            // Map students to response format
            $studentResponses = $students->map(function ($student) {
                return (new StudentResponse($student))->toArray();
            });

            // Return Inertia response
            return Inertia::render('StudentComponent', [
                'students' => $studentResponses,
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
                'message' => 'Unable to fetch students: ' . $e->getMessage(),
            ])->withStatus(500);
        }
    }
}
