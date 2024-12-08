<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectData extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'tools',
        'role',
        'description',
        'demo_link',
        'github_link',
        'image_path',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'tools' => 'array', // JSON field cast to array
    ];
}
