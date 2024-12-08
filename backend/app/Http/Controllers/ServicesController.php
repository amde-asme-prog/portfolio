<?php

namespace App\Http\Controllers;

use App\Models\Services;
use Illuminate\Http\Request;

class ServicesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $services = Services::all();
        if ($services->isEmpty()) {
            return response()->json(['message' => 'No services found.'], 404); // 404 Not Found
        }
        return response()->json($services, 200); // 200 OK
    }

    public function store(Request $request)
    {
        $data = $request->only([
            'title',
            'description',
            'icon',
        ]);

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'icon' => 'required|string|max:255',
        ]);

        $service = Services::create($data);
        return response()->json($service, 201); // 201 Created
    }

    public function update(Request $request, $id)
    {
        $data = $request->only([
            'title',
            'description',
            'icon',
        ]);

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'icon' => 'required|string|max:255',
        ]);

        $service = Services::find($id);

        if (!$service) {
            return response()->json(['message' => 'No service found with this id.'], 404); // 404 Not Found
        }

        $service->update($data);

        return response()->json(['message' => 'Service updated successfully'], 200); // 200 OK
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $service = Services::find($id);

        if (!$service) {
            return response()->json(['message' => 'No service found with this id.'], 404); // 404 Not Found
        }

        $service->delete();

        return response()->json(['message' => 'Service deleted successfully'], 200); // 200 OK
    }
}
