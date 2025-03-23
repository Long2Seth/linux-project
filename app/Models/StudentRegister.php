<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentRegister extends Model
{
    // Table name (matches the migration)
    protected $table = 'students_register';

    // Fillable fields (matches migration and request validation)
    protected $fillable = [
        'slug',
        'profile_image',
        'first_name',
        'last_name',
        'gender',
        'date_of_birth',
        'nationality',
        'place_of_birth',
        'department_name',
        'phone_number',
        'mother_name',
        'father_name',
        'date_of_birth_mother',
        'date_of_birth_father',
        'family_phone_number',
        'verified',
    ];

    // Casts for proper data types (matches migration)
    protected $casts = [
        'date_of_birth' => 'date',
        'date_of_birth_mother' => 'date',
        'date_of_birth_father' => 'date',
        'verified' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // Default values (matches prepareForValidation in request)
    protected $attributes = [
        'department_name' => 'Information Technology',
        'verified' => false,
        'nationality' => 'khmer',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        // Automatically generate slug when creating
        static::creating(function ($model) {
            if (empty($model->slug)) {
                $model->slug = $model->generateSlug();
            }
        });
    }

    /**
     * Generate slug based on first_name, last_name, and date_of_birth
     * Matches the StudentRegisterRequest logic
     */
    public function generateSlug(): string
    {
        $firstName = $this->first_name ?? '';
        $lastName = $this->last_name ?? '';
        $dob = $this->date_of_birth ?? '';

        $dobFormatted = $dob ? $this->date_of_birth->format('Ymd') : 'unknown';
        return strtolower("{$firstName}_{$lastName}_{$dobFormatted}");
    }

    /**
     * Scope to get verified students
     */
    public function scopeVerified($query)
    {
        return $query->where('verified', true);
    }

    /**
     * Get full name
     */
    public function getFullNameAttribute(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }
}
