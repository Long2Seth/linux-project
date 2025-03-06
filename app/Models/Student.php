<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Student extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'slug',
        'first_name',
        'last_name',
        'gender',
        'date_of_birth',
        'address',
        'start_date',
        'end_date',
        'department',
        'phone_number',
        'email',
        'password',
        'status',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     */
    protected function casts(): array
    {
        return [
            'date_of_birth' => 'datetime',
            'start_learn' => 'datetime',
            'end_learn' => 'datetime',
        ];
    }

    /**
     * Boot method to set default values.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($student) {
            $student->email = strtolower($student->first_name . $student->last_name . '.2021@gmail.com');
            $student->password = bcrypt('Student@2021');
            $student->department = 'Information Technology';
        });
    }
}
