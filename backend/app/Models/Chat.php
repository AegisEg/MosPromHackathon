<?php
declare(strict_types=1);

namespace App\Models;

use App\Casts\DateTimeImmutableCast;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    protected $table = 'chats';

    protected $fillable = [
        'respond_id',
        'respond_type',
    ];

    protected $casts = [
        'created_at' => DateTimeImmutableCast::class,
        'updated_at' => DateTimeImmutableCast::class,
    ];

    public function respond() {
        return $this->belongsTo(Responds::class);
    }

    public function internshipRespond() {
        return $this->belongsTo(InternshipRespond::class, 'respond_id', 'id');
    }

    public function messages() {
        return $this->hasMany(ChatMessage::class);
    }
}
