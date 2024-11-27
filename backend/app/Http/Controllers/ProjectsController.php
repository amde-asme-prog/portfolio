<?php

namespace App\Http\Controllers;

use App\Models\Projects;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProjectsController extends Controller
{
    /**
     * Display a listing of the projects.
     */
    public function index()
    {
        $projects = Projects::all();
        if (!$projects) {
            return response()->json(['message' => 'No project found'], 404);
        }
       foreach ($projects as $project) {
        if ($project->image_path) {
            // Construct the full URL for the image
            $project->image_path = asset('storage/' . str_replace('public/', '', $project->image_path));
        }
    }
        return response()->json($projects);
    }

    /**
     * Store a newly created project in storage.
     */
    public function store(Request $request)
    {
        \Log::info($request);
        $data = $request->only([
            'title',
            'role',
            'description',
            'demo_link',
            'github_link',
        ]);

         $request->validate([
            'title' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'tools' => 'nullable|array',
            'description' => 'nullable|string',
            'demo_link' => 'nullable|string',
            'github_link' => 'nullable|string',
        ]);
        
            
        if ($request->hasFile('image_path')) {
            $originalFileName = $request->file('image_path')->getClientOriginalName();         
            $path = $request->file('image_path')->storeAs('images',$originalFileName, 'public');
            $data['image_path'] = $path;
        }else  {
            \Log::warning('No file found in the request');
        }
        
        if($request->has('tools')){
            $data['tools'] = json_encode($request->tools);
        }

        $project = Projects::create($data);
        return response()->json($project, 201);
    }

    /**
     * Display the specified project.
     */
    public function show($id)
    {
        $project = Projects::findOrFail($id);
        return response()->json($project);
    }

    /**
     * Update the specified project in storage.
     */
    public function update(Request $request, $id)
    {
        \Log::info($request);
        $project = Projects::findOrFail($id);

        $data = $request->only([
            'title',
            'role',
            'description',
            'demo_link',
            'github_link',
            'image_path'
        ]);

        // $validated = $request->validate([
        //     'title' => 'required|string|max:255',
        //     'role' => 'required|string|max:255',
        //     'tools' => 'nullable|array',
        //     'description' => 'nullable|string',
        //     'demo_link' => 'nullable|string',
        //     'github_link' => 'nullable|string',
        //     'image_path' => 'nullable|string',
        // ]);

        if ($request->has('image_path')) {
            $oldImage = $project->image_path;
            
            if ($request->hasFile('image_path')) {
                \Log::info('file exists');
                $originalFileName = $request->file('image_path')->getClientOriginalName();

                // Store the new image
                
                $path = $request->file('image_path')->storeAs('images',$originalFileName, 'public');
                $data['image_path'] = $path;
        
                // Delete old image if exists
                if ($oldImage && Storage::disk('public')->exists($oldImage)) {
                    Storage::disk('public')->delete($oldImage);
                }
            } else {
                // If no new image, keep the old one
                $data['image_path'] = $oldImage;
            }
        }else  {
            \Log::warning('No file found in the request');
        }

        if($request->has('tools')){
            $data['tools'] = json_encode($request->tools);
        }

        $project->update($data);
        return response()->json($project);
    }

    /**
     * Remove the specified project from storage.
     */
    public function destroy($id)
    {
        $project = Projects::findOrFail($id);
        $project->delete();

        return response()->json(['message' => 'Project deleted successfully']);
    }
}




