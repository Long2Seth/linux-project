<?php

namespace App\Http\Requests\Student;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Carbon\Carbon;

class EditStudent extends FormRequest
{
    public function authorize()
    {
        return true; // Adjust based on your auth logic
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
            'end_date' => ['required', 'date', 'after:start_date'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $firstName = $this->input('first_name');
        $lastName = $this->input('last_name');
        $dateOfBirth = $this->input('date_of_birth');

        $this->merge([
            'slug' => strtolower($firstName . "-" . $lastName. "-" . str_replace('-', '', $dateOfBirth)),
            'email' => strtolower($firstName . $lastName . Carbon::now()->year . '@gmail.com'),
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
            'end_date.required' => 'End date is required.',
            'end_date.after' => 'End date must be after the start date.',
        ];
    }
}
