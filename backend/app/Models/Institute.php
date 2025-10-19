<?php
declare(strict_types=1);

namespace App\Models;

use App\Casts\DateTimeImmutableCast;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Institute extends Model
{
    protected $table = 'institutes';

    protected $fillable = [
        'user_id',
        'name',
    ];

    protected $casts = [ // phpcs:ignore
        'created_at' => DateTimeImmutableCast::class,
        'updated_at' => DateTimeImmutableCast::class,
    ];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }
}
