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
            'profile_image'=> $this->student->profile_image,
            'slug' => $this->student->slug,
            'first_name' => $this->student->first_name,
            'last_name' => $this->student->last_name,
            'gender' => $this->student->gender,
            'date_of_birth' => $this->student->date_of_birth,
            'nationality' => $this->student->nationality,
            'place_of_birth' => $this->student->place_of_birth,
            'department_name' => $this->student->department_name,
            'phone_number' => $this->student->phone_number,
            'mother_name' => $this->student->mother_name,
            'father_name' => $this->student->father_name,
            'date_of_birth_mother' => $this->student->date_of_birth_mother,
            'date_of_birth_father' => $this->student->date_of_birth_father,
            'family_phone_number' => $this->student->family_phone_number,
            'verified' => $this->student->verified,

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
