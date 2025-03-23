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

    public function toArray()
    {
        return [
            'id' => $this->student->id,
            'profile_image' => $this->student->profile_image, // Uncommented and added
            'slug' => $this->student->slug,
            'first_name' => $this->student->first_name,
            'last_name' => $this->student->last_name,
            'gender' => $this->student->gender,
            'date_of_birth' => $this->student->date_of_birth,
            'nationality' => $this->student->nationality, // Added
            'place_of_birth' => $this->student->place_of_birth, // Added
            'address' => $this->student->address,
            'start_date' => $this->student->start_date,
            'end_date' => $this->student->end_date,
            'department_name' => $this->student->department_name,
            'phone_number' => $this->student->phone_number,
            'email' => $this->student->email,
            'mother_name' => $this->student->mother_name, // Added
            'father_name' => $this->student->father_name, // Added
            'date_of_birth_mother' => $this->student->date_of_birth_mother, // Added
            'date_of_birth_father' => $this->student->date_of_birth_father, // Added
            'family_phone_number' => $this->student->family_phone_number, // Added
            'is_status' => $this->student->is_status, // Fixed from 'status' to 'is_status'
            'is_graduate' => $this->student->is_graduate,
            'is_deleted' => $this->student->is_deleted,
            'created_at' => $this->student->created_at, // Added from timestamps
            'updated_at' => $this->student->updated_at, // Added from timestamps
        ];
    }

    public function toJson()
    {
        return json_encode($this->toArray());
    }
}
