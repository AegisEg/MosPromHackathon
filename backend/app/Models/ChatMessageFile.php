<?php
declare(strict_types=1);

namespace App\Models;

use App\Casts\DateTimeImmutableCast;
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

    protected $casts = [
        'created_at' => DateTimeImmutableCast::class,
        'updated_at' => DateTimeImmutableCast::class,
    ];

    public function chatMessage() {
        return $this->belongsTo(ChatMessage::class, 'chat_message_id', 'id');
    }
}
