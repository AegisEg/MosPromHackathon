<?php
declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChatMessageFile extends Model
{
    protected $table = 'chat_message_files';

    protected $fillable = [
        'chat_message_id',
        'path',
        'original_name',
        'size',
        'mime_type',
    ];

    public function chatMessage() {
        return $this->belongsTo(ChatMessage::class, 'chat_message_id', 'id');
    }
}
