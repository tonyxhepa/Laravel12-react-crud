<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PostUpdateController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, Post $post)
    {
        $data = $request->validate([
            'title' => 'required',
            'content' => 'required',
            'image' => 'nullable|image',
        ]);
        $data['slug'] = str($data['title'])->slug();
        $data['image'] = $post->image;

        if ($request->hasFile('image')) {
            Storage::disk('public')->delete($post->image);
            $data['image'] = Storage::disk('public')->put('posts', $request->file('image'));
        }

        $post->update($data);

        return to_route('posts.index')->with('success', 'Post updated successfully.');
    }
}
