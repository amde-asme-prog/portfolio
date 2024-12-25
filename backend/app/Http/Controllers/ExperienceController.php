<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Experience;
use Illuminate\Http\Response;

class ExperienceController extends Controller
{
    public function index()
    {
        $experiences = Experience::all();
        
        if ($experiences->isEmpty()) {
            return response()->json(['message' => 'No experiences found'], 404);
        }
        
        return response()->json($experiences,  200);
    }

    /**
     * Display the specified experience.
     */
    public function show($id)
    {
        $experience = Experience::find($id);

        if (!$experience) {
            return response()->json(['message' => 'Experience not found'], 404);
        }

        return response()->json($experience, 200);
    }

    /**
     * Store a newly created experience in storage.
     */
    public function store(Request $request)
    {
        $data = $request->only([
            'title',
            'company',
            'start_date',
            'end_date',
            'responsibilities',
            'achievements',
        ]);
        // Validate the request data
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date', // Ensure end date is after start date
            'responsibilities' => 'nullable|string|max:500',
            'technologies' => 'nullable|array', // technologies should be an array
            'achievements' => 'nullable|string|max:500',
        ]);

        // Handle technologies as an array and ensure they are encoded
        if($request->has('technologies')) {
            $data['technologies'] = json_encode($request['technologies']);
        }

        // Create a new experience
        $experience = Experience::create($data);

        return response()->json($experience);
    }

    /**
     * Update the specified experience in storage.
     */
    public function update(Request $request, $id)
    {
        // Find the experience to update
        $experience = Experience::find($id);
        if (!$experience) {
            return response()->json(['message' => 'Experience not found'], 404);
        }
    
        // Log incoming request for debugging
        \Log::info('Update Request Data:', $request->all());
    
        // Validate the request data
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'company' => 'required|string|max:255',
                'start_date' => 'required|date',
                'end_date' => 'required|date|after_or_equal:start_date',
                'responsibilities' => 'nullable|string|max:500',
                'technologies' => 'nullable|array',
                'technologies.*' => 'string',
                'achievements' => 'nullable|string|max:500',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            \Log::error('Validation Errors:', $e->errors());
            return response()->json(['errors' => $e->errors()], 422);
        }
    
        // Log the validated data for debugging
        \Log::info('Validated Data:', $validated);
    
        // Encode technologies if provided
        if (isset($validated['technologies'])) {
            $validated['technologies'] = json_encode($validated['technologies']);
        }
    
        // Update the experience
        $experience->update($validated);
    
        return response()->json($experience, 200);
    }
    


    /**
     * Remove the specified experience from storage.
     */
    public function destroy($id)
    {
        // Find the experience
        $experience = Experience::find($id);

        if (!$experience) {
            return response()->json(['message' => 'Experience not found'], 404);
        }

        // Delete the experience
        $experience->delete();

        return response()->json(['message' => 'Experience deleted'], 200);
    }
}
