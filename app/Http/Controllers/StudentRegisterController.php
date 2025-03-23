<?php

namespace App\Http\Controllers;

use App\Http\Requests\Student\StudentRegisterRequest;
use App\Models\StudentRegister;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentRegisterController extends Controller
{
    /**
     * Store a new student registration
     */
    public function store(StudentRegisterRequest $request)
    {
        try {
            $validatedData = $request->validated();

            // Handle profile image upload
            if ($request->hasFile('profile_image')) {
                $file = $request->file('profile_image');
                if (!$file->isValid()) {
                    throw new \Exception('Invalid file upload');
                }
                $path = $file->store('profile_images', 'public');
                $validatedData['profile_image'] = $path;
            }

            // Ensure verified is cast to boolean (already handled by $casts in model, but explicit here for clarity)
            $validatedData['verified'] = (bool) $validatedData['verified'];

            // Create the student registration
            $student = StudentRegister::create($validatedData);

            // Redirect to the students list with a success message
            return redirect()->route('students.index')->with('success', 'Student registration successful!');
        } catch (\Exception $e) {
            // Log the error and redirect back with an error message
            \Log::error('Failed to register student: ' . $e->getMessage(), [
                'request_data' => $request->all(),
                'exception' => $e->getTraceAsString(),
            ]);

            return redirect()->back()->withErrors(['message' => 'Failed to register student: ' . $e->getMessage()]);
        }
    }
}
