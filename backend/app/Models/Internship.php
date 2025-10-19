<?php
declare(strict_types=1);

namespace App\Models;

use App\Casts\DateTimeImmutableCast;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Internship extends Model
{
    use HasFactory;

    protected $fillable = [
        'institute_id',
        'speciality',
        'count_students',
        'start_date_period',
        'end_date_period',
    ];

    protected $casts = [
        'start_date_period' => DateTimeImmutableCast::class,
        'end_date_period'   => DateTimeImmutableCast::class,
        'created_at'        => DateTimeImmutableCast::class,
        'updated_at'        => DateTimeImmutableCast::class,
    ];

    /**
     * Институт-владелец стажировки
     */
    public function institute(): BelongsTo {
        return $this->belongsTo(Institute::class);
    }

    /**
     * Отклики компаний на стажировку
     */
    public function responds() {
        return $this->hasMany(InternshipRespond::class);
    }
}
