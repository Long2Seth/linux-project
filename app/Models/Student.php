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
        'start_date',
        'end_date',
        'place_of_birth',
        'address',
        'department_name',
        'phone_number',
        'is_deleted',
        'is_graduate',

    ];

    protected $casts = [
        'is_deleted' => 'boolean',
        'date_of_birth' => 'date',
        'date_of_birth_mother' => 'date',
        'date_of_birth_father' => 'date',
    ];
}
