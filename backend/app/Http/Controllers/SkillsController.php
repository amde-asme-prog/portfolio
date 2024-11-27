<?php

namespace App\Http\Controllers;

use App\Models\Skills;
use Illuminate\Http\Request;

class SkillsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $skills = Skills::all();
        if ($skills->isEmpty()) {
            return response()->json(['message' => 'No skills found.'], 404);  // 404 for not found
        }
        return response()->json($skills, 200);  // 200 for success
    }

    public function store(Request $request)
    {
        $data = $request->only([
            'name',
            'group',
            'type',
            'proficiency',
            'icon',
        ]);

        $request->validate([
            'name' => 'required|string|max:255',
            'group' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'proficiency' => 'required|string|max:255',
            'icon' => 'required|string|max:255',
        ]);

        $skills = Skills::create($data);
        return response()->json($skills, 201);  // 201 for resource created
    }

    public function update(Request $request, $id)
    {
        $skill = Skills::find($id);

        if (!$skill) {
            return response()->json(['message' => 'No skill found with this id.'], 404);  // 404 if not found
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'group' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'proficiency' => 'required|string|max:255',
            'icon' => 'required|string|max:255',
        ]);

        $skill->update($validated);

        return response()->json(['message' => 'Skill updated successfully'], 200);  // 200 for success
    }

    public function destroy($id)
    {
        $skill = Skills::find($id);

        if (!$skill) {
            return response()->json(['message' => 'No skill found with this id.'], 404);  // 404 if not found
        }

        $skill->delete();

        return response()->json(['message' => 'Skill deleted successfully'], 200);  // 200 for success
    }
}
