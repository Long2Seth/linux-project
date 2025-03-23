<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('students_register', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('profile_image');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('gender');
            $table->date('date_of_birth');
            $table->string('nationality');
            $table->string('place_of_birth');
            $table->text('address')->nullable();
            $table->string('department_name');
            $table->string('phone_number')->nullable();
            $table->string('mother_name');
            $table->string('father_name');
            $table->string('date_of_birth_mother');
            $table->string('date_of_birth_father');
            $table->string('family_phone_number');
            $table->boolean('verified');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students_register');
    }
};
