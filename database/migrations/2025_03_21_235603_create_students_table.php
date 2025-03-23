<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentsTable extends Migration
{
    public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('profile_image');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('gender');
            $table->date('date_of_birth');
            $table->text('address')->nullable();
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->string('department_name');
            $table->string('phone_number')->nullable();
            $table->string('email')->unique();
            $table->boolean('status');
            $table->boolean('is_graduate');
            $table->boolean('is_deleted');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('students');
    }
}
