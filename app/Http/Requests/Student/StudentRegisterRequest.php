<?php

namespace App\Http\Requests\Student;

use Illuminate\Foundation\Http\FormRequest;

class StudentRegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Adjust authorization logic as needed
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'department_name' => $this->department_name ?? 'Information Technology',
            'verified' => $this->verified ?? false,
            'nationality' => $this->nationality ?? 'khmer',
            'slug' => $this->generateSlug(),
        ]);
    }

    protected function generateSlug(): string
    {
        $firstName = $this->input('first_name', '');
        $lastName = $this->input('last_name', '');
        $dob = $this->input('date_of_birth', '');

        $dobFormatted = $dob ? date('Ymd', strtotime($dob)) : 'unknown';
        return strtolower("{$firstName}_{$lastName}_{$dobFormatted}");
    }

    public function rules(): array
    {
        return [
            'slug' => 'required|string|unique:students_register,slug|max:255', // Updated table name to match model
            'profile_image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'gender' => 'required|string|in:male,female',
            'date_of_birth' => 'required|date|before:today',
            'nationality' => 'required|string|max:255',
            'place_of_birth' => 'required|string|max:255',
            'department_name' => 'required|string|max:255',
            'phone_number' => 'nullable|string|max:20', // Made nullable to match frontend
            'mother_name' => 'required|string|max:255',
            'father_name' => 'required|string|max:255',
            'date_of_birth_mother' => 'required|date|before:today',
            'date_of_birth_father' => 'required|date|before:today',
            'family_phone_number' => 'required|string|max:20',
            'verified' => 'required|boolean',
        ];
    }

    public function messages(): array
    {
        return [
            // ... (unchanged messages)
            'phone_number.max' => 'The phone number must not exceed 20 characters.',
        ];
    }
}
