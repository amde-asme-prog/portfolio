<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class About extends Model
{
    use HasFactory;
   

    protected $fillable = [
        'about_me',
        'image_path',
        'core_title',
        'core_lists',
        'core_subtitle',
        'interest_title',
        'interest_subtitle',
        'interests_lists',  
    ];
    protected $casts = [
        'core_lists' => 'array',
        'interests_lists' => 'array',
    ];
}
