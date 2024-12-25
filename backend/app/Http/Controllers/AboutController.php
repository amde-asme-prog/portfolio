<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\About;
use Illuminate\Support\Facades\Storage;

class AboutController extends Controller
{
    public function getAboutData()
    {
        $about = About::first();

        if (!$about) {
            return response()->json(['message' => 'No about found'], 404);
        }

        // If image exists, prepend the correct URL to image path.
        if ($about->image_path) {
            $about->image_path = asset('storage/' . str_replace('public/', '', $about->image_path));
        }

        return response()->json($about, 200);
    }

    public function updateAboutData(Request $request)
    {
        \Log::info($request);
        $about = About::first();
         // Extract relevant fields from the request.
         $data = $request->only([
            'about_me',
            'image_path',
            'core_title',
            'core_subtitle',
            'interest_title',
            'interest_subtitle',
        ]);

        // Validate the request.
        $request->validate([
            'about_me' => 'required|string|max:255',
            'core_title' => 'nullable|string|max:255',
            'core_subtitle' => 'nullable|string|max:255',
            'interest_title' => 'nullable|string|max:255',
            'interest_subtitle' => 'nullable|string|max:255',
        ]);

        // Handle JSON arrays (core_lists, interests_lists).
        if ($request->has('interests_lists')) {
            $data['interests_lists'] = json_encode($request->interests_lists);
        }

        if ($request->has('core_lists')) {
            $data['core_lists'] = json_encode($request->core_lists);
        }

        // Handle image upload and update.
        if ($request->has('image_path')) {
            $oldImage = $about->image_path;

            // If the user is uploading a file, handle the file storage.
            if ($request->hasFile('image_path')) {
                $originalFileName = $request->file('image_path')->getClientOriginalName();
                $path = $request->file('image_path')->storeAs('about', $originalFileName, 'public');
                $data['image_path'] = $path;

                // Delete old image if exists.
                if ($oldImage && Storage::disk('public')->exists($oldImage)) {
                    Storage::disk('public')->delete($oldImage);
                }
            } else {
                // If no new image is uploaded, keep the old image path.
                $data['image_path'] = $oldImage;
            }
        }

        // If no "about" entry exists, create a new one.
        if (!$about) {
            $about = About::create($data);
            return response()->json([
                'message' => 'About created successfully',
                'data' => $about,
            ], 201);
        }

        // Update the "about" record with new data.
        $about->update($data);

        return response()->json([
            'message' => 'About updated successfully',
            'data' => $about,
        ], 200);
    }
}
