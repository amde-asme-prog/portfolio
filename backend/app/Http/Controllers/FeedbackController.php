<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Feedback;

class FeedbackController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $feedbacks = Feedback::all();
        
        if ($feedbacks->isEmpty()) {
            return response()->json(['message' => 'No feedback found.'], 404); // 404 Not Found
        }

        return response()->json($feedbacks, 200); // 200 OK
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->only([
            'name',
            'email',
            'job',
            'comment',
            'rating',
        ]);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|max:255',
            'job' => 'nullable|string|max:255',
            'comment' => 'nullable|string|max:255',
            'rating' => 'nullable|numeric',
        ]);

        $feedback = Feedback::create($data);

        return response()->json($feedback, 201); // 201 Created
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $feedback = Feedback::find($id);

        if (!$feedback) {
            return response()->json(['message' => 'Feedback not found.'], 404); // 404 Not Found
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|max:255',
            'job' => 'nullable|string|max:255',
            'comment' => 'nullable|string|max:255',
            'rating' => 'nullable|numeric',
        ]);

        $feedback->update($validated);

        return response()->json(['message' => 'Feedback successfully updated'], 200); // 200 OK
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $feedback = Feedback::find($id);

        if (!$feedback) {
            return response()->json(['message' => 'Feedback not found.'], 404); // 404 Not Found
        }
        
        $feedback->delete();

        return response()->json(['message' => 'Feedback successfully deleted'], 200); // 200 OK
    }
}
