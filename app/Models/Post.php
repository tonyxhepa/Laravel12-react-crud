<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = [
        'title',
        'content',
        'user_id',
        'slug',
        'image',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
