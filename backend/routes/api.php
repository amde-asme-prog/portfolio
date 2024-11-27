<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LandingContentController;
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\SkillsController;
use App\Http\Controllers\ProjectsController;
use App\Http\Controllers\ServicesController;
use App\Http\Controllers\MessagesController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::middleware('auth:sanctum')->group(function () {}); // Add authentication middleware to all routes in this group


Route::get('landing', [LandingContentController::class, 'getContent']);
Route::post('landing', [LandingContentController::class, 'updateContent']);
Route::get('landing/download-cv', [LandingContentController::class, 'downloadCv']);


Route::get('experiences', [ExperienceController::class, 'index']);
Route::get('experiences/{id}', [ExperienceController::class, 'show']);
Route::post('experiences', [ExperienceController::class, 'store']);
Route::put('experiences/{id}', [ExperienceController::class, 'update']);
Route::delete('experiences/{id}', [ExperienceController::class, 'destroy']);

Route::get('feedbacks', [FeedbackController::class, 'index']);
Route::get('feedbacks/{id}', [FeedbackController::class, 'show']);
Route::post('feedbacks', [FeedbackController::class, 'store']);
Route::put('feedbacks/{id}', [FeedbackController::class, 'update']);
Route::delete('feedbacks/{id}', [FeedbackController::class, 'destroy']);

Route::get('skills', [SkillsController::class, 'index']);
Route::post('skills', [SkillsController::class, 'store']);
Route::put('skills/{id}', [SkillsController::class, 'update']); 
Route::get('skills/{id}', [SkillsController::class, 'show']);
Route::delete('skills/{id}', [SkillsController::class, 'destroy']);


Route::get('projects', [ProjectsController::class, 'index']);
Route::post('projects', [ProjectsController::class, 'store']);
Route::put('projects/{id}', [ProjectsController::class, 'update']); 
Route::get('projects/{id}', [ProjectsController::class, 'show']);    
Route::delete('projects/{id}', [ProjectsController::class, 'destroy']);

Route::apiResource('services', ServicesController::class);

Route::apiResource('messages', MessagesController::class);





