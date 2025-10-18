<?php
declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChatMessage extends Model
{
    protected $table = 'chat_messages';

    protected $fillable = [
        'chat_id',
        'user_id',
        'text',
    ];

    public function chat() {
        return $this->belongsTo(Chat::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function files() {
        return $this->hasMany(ChatMessageFile::class, 'chat_message_id', 'id');
    }
}
