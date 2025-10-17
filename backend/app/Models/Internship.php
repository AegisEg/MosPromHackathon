<?php

namespace App\Models;

use App\Casts\DateTimeImmutableCast;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Internship extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'speciality',
        'count_students',
        'start_date_period',
        'end_date_period',
    ];

    protected $casts = [
        'start_date_period' => DateTimeImmutableCast::class,
        'end_date_period' => DateTimeImmutableCast::class,
    ];

    /**
     * Получить пользователя, которому принадлежит стажировка
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
