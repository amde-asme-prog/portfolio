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
        Schema::create('landing_contents', function (Blueprint $table) {
            $table->id();
            $table->string('greeting')->nullable();
            $table->string('introduction')->nullable();
            $table->string('name')->nullable();
            $table->string('additional_text')->nullable();
            $table->json('typewriter_texts')->nullable();
            $table->json('reference_icons')->nullable();
            $table->string('image_path')->nullable();
            $table->string('cv_path')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('landing_contents');
    }
};
