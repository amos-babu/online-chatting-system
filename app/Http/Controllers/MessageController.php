<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Message;
use Inertia\Inertia;
use Inertia\Response;


class MessageController extends Controller
{

    public function userDisplay()
        {
            $loggedInUser = Auth::user();
            $users = User::all();
            $filteredUsers = $users->reject(function ($user) use ($loggedInUser) {
                return $user->id === $loggedInUser->id;
            });

            return Inertia::render('Dashboard', [
                'users' => $filteredUsers,
            ]);
        }

    /**
     * Display a listing of the resource.
     */

    public function sendMessage( Request $request )
    {
        $data = $request -> validate([
            'message' => 'required',
            'recipient_id' => 'required|exists:users,id'
        ]);

        $senderID =auth()->id();


        $message = Message::create([
            'message' => $data['message'],
            'sender_id' => $senderID,
            'recipient_id' => $data['recipient_id']
        ]);
        return redirect()->route('message.display', ['recipientId' => $data['recipient_id']])->with('success', 'Message sent successfully!');
    }


    public function messageDisplay($recipientId)
    {
        $currentUser = Auth::user();
        $recipientUser = User::findOrFail($recipientId);

        // Fetch all users except the currently logged-in user
        $users = User::with('messages')->where('id', '<>', $currentUser->id)->get();

        // Fetch all messages for the current chat (between $currentUser and $recipientUser)
        $messages = Message::where(function ($query) use ($currentUser, $recipientUser) {
            $query->where('sender_id', $currentUser->id)
                ->where('recipient_id', $recipientUser->id);
        })->orWhere(function ($query) use ($currentUser, $recipientUser) {
            $query->where('sender_id', $recipientUser->id)
                ->where('recipient_id', $currentUser->id);
        })->orderBy('created_at')->get();

        // Update the read status of the messages that belong to the recipient
        foreach ($messages as $message) {
            if ($message->recipient_id === $currentUser->id && !$message->is_read) {
                $message->update(['is_read' => true]);
            }
        }




        // dd($usersWithMessages);

        return Inertia::render('Dashboard', [
            'currentUser' => $currentUser,
            'users' => $users, // Pass the list of users to the view
            'messages' => $messages,
            'recipientId' => $recipientId,
        ]);
    }






    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
