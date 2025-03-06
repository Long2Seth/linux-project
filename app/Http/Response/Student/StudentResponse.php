<?php

namespace App\Http\Response\Student;

use App\Http\Controllers\StudentController;

class StudentResponse
{
    protected $student;

    public function __construct($student)
    {
        $this->student = $student;
    }

    // In StudentResponse.php
    public function toArray()
    {
        return [
            'id' => $this->student->id,
            'slug' => $this->student->slug,
            'first_name' => $this->student->first_name,
            'last_name' => $this->student->last_name,
            'gender' => $this->student->gender,
            'date_of_birth' => $this->student->date_of_birth,
            'address' => $this->student->address,
            'start_date' => $this->student->start_date,
            'end_date' => $this->student->end_date,
            'department' => $this->student->department,
            'phone_number' => $this->student->phone_number,
            'email' => $this->student->email,
            'status' => $this->student->status,
        ];
    }

// In StudentController.php
    public function index()
    {
        try {
            $students = Student::paginate(10); // Added pagination
            $studentResponses = $students->map(function ($student) {
                return (new StudentResponse($student))->toArray();
            });

            return response()->json([
                'data' => $studentResponses,
                'meta' => [
                    'current_page' => $students->currentPage(),
                    'last_page' => $students->lastPage(),
                    'total' => $students->total(),
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Unable to fetch students'], 500);
        }
    }

    public function toJson()
    {
        return json_encode($this->toArray());
    }
}
