<?php

namespace App\Http\Controllers;

use App\Http\Requests\Student\StudentRegisterRequest;
use App\Models\StudentRegister;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentRegisterController extends Controller
{
    public function create()
    {
        return Inertia::render('StudentRegister/Create');
    }

    public function store(StudentRegisterRequest $request)
    {
        try {
            $validatedData = $request->validated();

            if ($request->hasFile('profile_image')) {
                $file = $request->file('profile_image');
                if (!$file->isValid()) {
                    throw new \Exception('Invalid file upload');
                }
                $path = $file->store('profile_images', 'public');
                $validatedData['profile_image'] = $path;
            }

            $validatedData['verified'] = (bool)$validatedData['verified'];
            StudentRegister::create($validatedData);

            return redirect()->route('student.create')->with('success', 'Student registration successful!');
        } catch (\Exception $e) {
            \Log::error('Failed to register student: ' . $e->getMessage(), [
                'request_data' => $request->all(),
                'exception' => $e->getTraceAsString(),
            ]);

            return redirect()->back()->withErrors(['message' => 'Failed to register student: ' . $e->getMessage()]);
        }
    }

    public function index(Request $request)
    {
        try {
            $perPage = $request->input('per_page', 10);
            $search = $request->input('search');
            $department = $request->input('department');
            $status = $request->input('status');

            $query = StudentRegister::query();

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
                $query->where('verified', $status === 'true' ? 1 : 0);
            }

            $students = $query->paginate($perPage)->withQueryString();

            return Inertia::render('user', [
                'students' => $students->map(function ($student) {
                    return [
                        'id' => $student->id,
                        'profile_image' => $student->profile_image,
                        'slug' => $student->slug,
                        'first_name' => $student->first_name,
                        'last_name' => $student->last_name,
                        'gender' => $student->gender,
                        'date_of_birth' => $student->date_of_birth,
                        'nationality' => $student->nationality,
                        'place_of_birth' => $student->place_of_birth,
                        'department_name' => $student->department_name,
                        'phone_number' => $student->phone_number,
                        'mother_name' => $student->mother_name,
                        'father_name' => $student->father_name,
                        'date_of_birth_mother' => $student->date_of_birth_mother,
                        'date_of_birth_father' => $student->date_of_birth_father,
                        'family_phone_number' => $student->family_phone_number,
                        'verified' => $student->verified,
                    ];
                })->all(),
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
            \Log::error('Failed to fetch students: ' . $e->getMessage());
            return Inertia::render('Students', [
                'errors' => ['message' => 'Unable to fetch students'],
            ]);
        }
    }

    public function updateVerified(Request $request, $studentId)
    {
        try {
            $student = StudentRegister::findOrFail($studentId);
            $student->update(['verified' => true]);

            // Redirect to show, which will trigger the frontend to handle the next step
            return redirect()->route('user.show', $studentId)
                ->with('success', 'Student verification updated successfully');
        } catch (\Exception $e) {
            \Log::error('Failed to update student verification: ' . $e->getMessage());
            return redirect()->back()->withErrors([
                'message' => 'Failed to update verification: ' . $e->getMessage()
            ]);
        }
    }



}
