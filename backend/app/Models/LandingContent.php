<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LandingContent extends Model
{
    use HasFactory;

    protected $fillable = [
        'greeting',
        'introduction',
        'name',
        'additional_text',
        'typewriter_texts',
        'reference_icons',
        'image_path',
        'cv_path',
    ];

    protected $casts = [
        'typewriter_texts' => 'array',
        'reference_icons' => 'array',
    ];
}
