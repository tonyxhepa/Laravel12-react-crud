<?php

namespace App\Http\Controllers;

use Inertia\Response;

class PostCreateController extends Controller
{
    /**
     * Handle the incoming request.
     * @return response
     */
    public function __invoke(): Response
    {
        return inertia('posts/create');
    }
}
