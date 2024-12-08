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
        Schema::create('abouts', function (Blueprint $table) {
            $table->id();
            $table->string('about_me');
            $table->string('image_path')->nullable();
            $table->string('core_title');
            $table->json('core_lists');
            $table->string('core_subtitle');
            $table->string('interest_title');
            $table->string('interest_subtitle');
            $table->json('interests_lists');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('abouts');
    }
};
