<?php

namespace App\Http\Requests\Student;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Carbon\Carbon;

class StudentRequest extends FormRequest
{
    public function authorize()
    {
        return true; // Adjust authorization logic if needed
    }

    public function rules(): array
    {
        return [
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'gender' => ['required', 'string', Rule::in(['Male', 'Female'])],
            'date_of_birth' => ['required', 'date', 'before:today'],
            'phone_number' => ['nullable', 'string', 'max:20', 'regex:/^[+]?[0-9]{8,15}$/'],
            'address' => ['nullable', 'string', 'max:500'],
            'slug' => ['required', 'string', 'unique:students,slug'],
            'department_name' => ['required', 'string', 'max:255'],
            'nationality' => ['required', 'string', 'max:255'],
            'place_of_birth' => ['required', 'string', 'max:255'],
            'mother_name' => ['required', 'string', 'max:255'],
            'father_name' => ['required', 'string', 'max:255'],
            'date_of_birth_mother' => ['required', 'date', 'before:today'],
            'date_of_birth_father' => ['required', 'date', 'before:today'],
            'family_phone_number' => ['required', 'string', 'max:20', 'regex:/^[+]?[0-9]{8,15}$/'],
            'start_date' => ['required', 'date', 'after_or_equal:today'],
            'end_date' => ['required', 'date', 'after:start_date'],
            'email' => ['required', 'email', 'unique:students,email'],
            'is_status' => ['required', 'boolean'],
            'is_graduate' => ['required', 'boolean'],
            'is_deleted' => ['required', 'boolean'],
            'profile_image' => ['nullable', 'file', 'image', 'max:2048'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $firstName = $this->input('first_name');
        $lastName = $this->input('last_name');
        $dateOfBirth = $this->input('date_of_birth');
        $currentYear = Carbon::now()->year;
        $startDate = Carbon::now()->addMonth()->startOfMonth();
        $endDate = $startDate->copy()->addYears(4);

        $this->merge([
            'slug' => strtolower($firstName . "-" . $lastName . "-" . str_replace('-', '', $dateOfBirth)),
            'email' => strtolower($firstName . "." . $lastName . "." . $currentYear . "@gmail.rupp.kh"),
            'start_date' => $startDate->toDateString(),
            'end_date' => $endDate->toDateString(),
            'is_status' => false,
            'is_graduate' => false,
            'is_deleted' => false,
        ]);
    }

    public function messages(): array
    {
        return [
            'first_name.required' => 'First name is required.',
            'last_name.required' => 'Last name is required.',
            'gender.required' => 'Gender is required.',
            'gender.in' => 'Gender must be either male or female.',
            'date_of_birth.required' => 'Date of birth is required.',
            'date_of_birth.before' => 'Date of birth must be in the past.',
            'phone_number.required' => 'Phone number is required.',
            'phone_number.regex' => 'Phone number must be a valid number (8-15 digits, optional + prefix).',
            'address.required' => 'Address is required.',
            'slug.unique' => 'The generated slug is already taken.',
            'department_name.required' => 'Department name is required.',
            'nationality.required' => 'Nationality is required.',
            'place_of_birth.required' => 'Place of birth is required.',
            'mother_name.required' => 'Mother\'s name is required.',
            'father_name.required' => 'Father\'s name is required.',
            'date_of_birth_mother.required' => 'Mother\'s date of birth is required.',
            'date_of_birth_mother.before' => 'Mother\'s date of birth must be in the past.',
            'date_of_birth_father.required' => 'Father\'s date of birth is required.',
            'date_of_birth_father.before' => 'Father\'s date of birth must be in the past.',
            'family_phone_number.required' => 'Family phone number is required.',
            'family_phone_number.regex' => 'Family phone number must be a valid number (8-15 digits, optional + prefix).',
            'start_date.required' => 'Start date is required.',
            'start_date.after_or_equal' => 'Start date must be today or in the future.',
            'end_date.required' => 'End date is required.',
            'end_date.after' => 'End date must be after the start date.',
            'email.required' => 'Email is required.',
            'email.unique' => 'The generated email is already taken.',
            'is_status.required' => 'Status is required.',
            'is_graduate.required' => 'Graduate status is required.',
            'is_deleted.required' => 'Deleted status is required.',
        ];
    }
}
