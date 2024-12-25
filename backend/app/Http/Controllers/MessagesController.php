<?php

namespace App\Http\Controllers;

use App\Models\Messages;
use Illuminate\Http\Request;

class MessagesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $messages = Messages::all();
        if($messages->isEmpty()){
            return response()->json(['message'=>'No messages found.']);
        }
        return response()->json($messages);
    }

  
    public function store(Request $request)
    {
        $data = $request->only([
            'sender_name',
            'sender_email',
            'subject',
            'content',
        ]);

        $request->validate([
            'sender_name'=>'required|string|max:255',
            'sender_email'=>'required|string|max:255',
            'subject'=>'required|string|max:255',
            'content'=>'required|string|max:255',
        ]);

        $messages = Messages::create($data);
        return response()->json($messages);
    }

   

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,$id)
    {
        $message = Messages::find($id);
        if(!$message){
            return response()->json(['message'=>'No message found with this id.']);
        }
        $data = $request->only([
            'sender_name',
            'sender_email',
            'subject',
            'content',
        ]);

        $request->validate([
            'sender_name'=>'required|string|max:255',
            'sender_email'=>'required|string|max:255',
            'subject'=>'required|string|max:255',
            'content'=>'required|string|max:255',
        ]);

        $message->update($data);

        return response()->json(['message'=>'Message updated successfully']);
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $message = Messages::find($id);

        if(!$message){
            return response()->json(['message'=>'No message found with this id.']);
        }

        $message->delete();

        return response()->json(['message'=>'Message deleted successfully']);
    }
}
