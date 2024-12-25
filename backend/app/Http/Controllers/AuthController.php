<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // Register a new user
    public function register(Request $request)
    {
       $credentials = $request->validate([
            'username' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create($credentials);

        $token = $user->createToken($request->username);

        return response()->json(['access_token' => $token->plainTextToken, 'token_type' => 'Bearer', 'user' => $user]);
    }

     

    // Login user
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email|exists:users',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if ($user || !Hash::check($credentials['password'], $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $user->createToken($user->username)->plainTextToken;

        return response()->json(['token' => $token, 'token_type' => 'Bearer', 'user' => $user]);
    }

    // Logout user
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }
}
