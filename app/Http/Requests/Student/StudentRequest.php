<?php

namespace App\Http\Requests\Student;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Carbon\Carbon;

class StudentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'gender' => ['required', 'string', Rule::in(['male', 'female'])],
            'date_of_birth' => ['required', 'date', 'before:today'],
            'start_date' => ['required', 'date', 'after_or_equal:today'],
            'phone_number' => ['required', 'string', 'max:20', 'regex:/^[+]?[0-9]{8,15}$/'],
            'address' => ['required', 'string', 'max:500'],
            'slug' => ['required', 'string', 'unique:students,slug'], // Ensure uniqueness
            'email' => ['required', 'email', 'unique:students,email'],
            'password' => ['required', 'string'],
            'end_date' => ['required', 'date', 'after:start_date'],
            'department_name' => ['required', 'string'],
            'status' => ['required', 'boolean'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $firstName = $this->input('first_name');
        $lastName = $this->input('last_name');
        $dateOfBirth = $this->input('date_of_birth');
        $startDate = $this->input('start_date');

        $this->merge([
            'slug' => strtolower($firstName . $lastName . str_replace('-', '', $dateOfBirth)),
            'end_date' => Carbon::parse($startDate)->addDays(1460)->toDateString(), // +1460 days
            'department_name' => 'Information Technology',
            'email' => strtolower($firstName . $lastName . Carbon::now()->year . '@gmail.com'),
            'password' => 'Student@' . Carbon::now()->year,
            'status' => true,
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
            'start_date.required' => 'Start date is required.',
            'start_date.after_or_equal' => 'Start date must be today or in the future.',
            'phone_number.required' => 'Phone number is required.',
            'phone_number.regex' => 'Phone number must be a valid number (8-15 digits, optional + prefix).',
            'address.required' => 'Address is required.',
            'slug.unique' => 'The generated slug is already taken.',
            'email.unique' => 'The generated email is already taken.',
        ];
    }
}
