<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable = [
        'slug',
        'profile_image',
        'first_name',
        'last_name',
        'gender',
        'email',
        'date_of_birth',
        'nationality',
        'start_date',
        'end_date',
        'place_of_birth',
        'address',
        'mother_name',
        'father_name',
        'date_of_birth_mother',
        'date_of_birth_father',
        'department_name',
        'phone_number',
        'is_deleted',
        'is_graduate',
        'is_status',
        'family_phone_number',
    ];

    protected $casts = [
        'is_deleted' => 'boolean',
        'date_of_birth' => 'date',
        'date_of_birth_mother' => 'date',
        'date_of_birth_father' => 'date',
    ];
}
