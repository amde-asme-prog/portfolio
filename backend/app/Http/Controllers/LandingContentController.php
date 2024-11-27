<?php

namespace App\Http\Controllers;

use App\Models\LandingContent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class LandingContentController extends Controller
{
    /**
     * Get the landing page content.
     */
    public function getContent()
    {
        $content = LandingContent::first();

        if (!$content) {
            return response()->json(['message' => 'No content found'], 404);
        }
        
        if ($content->image_path) {
            $content->image_path = asset('storage/' . str_replace('public/', '', $content->image_path));
        }
        
        if ($content->cv_path) {
            $content->cv_path = asset('storage/' . str_replace('public/', '', $content->cv_path));
        }

        return response()->json($content, 200);
    }

    /**
     * Update intro text or the whole content.
     */
    public function updateContent(Request $request)
    {
        $content = LandingContent::firstOrCreate([]);

        // Extract relevant fields from the request.
        $data = $request->only([
            'greeting',
            'introduction',
            'name',
            'additional_text',
            'typewriter_texts',
            'reference_icons',
        ]);

        // Validate the request.
        $request->validate([
            'greeting' => 'nullable|string|max:255',
            'introduction' => 'nullable|string|max:255',
            'name' => 'nullable|string|max:100',
            'additional_text' => 'nullable|string|max:255',
            'typewriter_texts' => 'nullable|array',
            'reference_icons' => 'nullable|array',
        ]);

        // Handle typewriter_texts array.
        if ($request->has('typewriter_texts')) {
            $data['typewriter_texts'] = json_encode($request->typewriter_texts);
        }

        // Handle reference_icons array.
        if ($request->has('reference_icons')) {
            $data['reference_icons'] = json_encode($request->reference_icons);
        }

        // Handle image upload and update.
        if ($request->has('image_path')) {
            $oldImage = $content->image_path;
            
            if ($request->hasFile('image_path')) {
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
        }

        // Handle cv file upload and update.
        if ($request->hasFile('cv_path')) {
            $oldCv = $content->cv_path;

            // If a new CV file is uploaded
            if ($request->hasFile('cv_path')) {
                $originalFileName = $request->file('cv_path')->getClientOriginalName();
                $path = $request->file('cv_path')->storeAs('cv',$originalFileName, 'public');
                $data['cv_path'] = $path;

                // Delete old CV file if exists
                if ($oldCv && Storage::disk('public')->exists($oldCv)) {
                    Storage::disk('public')->delete($oldCv);
                }


            } else {
                // If no new CV file, keep the old one
                $data['cv_path'] = $oldCv;
            }
        }
        
        // Update the content with new data.
        $content->update($data);

        return response()->json([
            'message' => 'Content updated successfully',
            'data' => $content,
        ], 200);
    }

    public function downloadCv()
    {
        $content = LandingContent::first();
    
        if (!$content) {
            return response()->json(['message' => 'No content found'], 404);
        }
    
        if ($content->cv_path) {
            // Generate the correct file path using storage_path
            $filePath = storage_path('app/public/' . str_replace('public/', '', $content->cv_path));
    
            // Check if the file exists
            if (file_exists($filePath)) {
                return response()->download($filePath);
            } else {
                return response()->json(['message' => 'File not found'], 404);
            }
        }
    
        return response()->json(['message' => 'No CV found'], 404); // Add a fallback message if there's no CV
    }

    
}


