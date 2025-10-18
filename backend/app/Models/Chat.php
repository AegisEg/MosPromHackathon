<?php
declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    protected $table = 'chats';

    protected $fillable = [
        'respond_id',
    ];

    public function respond() {
        return $this->belongsTo(Responds::class);
    }

    public function messages() {
        return $this->hasMany(ChatMessage::class);
    }
}
