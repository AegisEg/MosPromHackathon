<?php
declare(strict_types=1);

namespace App\Models;

use App\Casts\DateTimeImmutableCast;
use App\Domain\RespondAndInteraction\Enums\RespondStatus;
use Illuminate\Database\Eloquent\Model;

class Responds extends Model
{
    protected $table = 'responds';

    protected $fillable = [
        'vacancy_id',
        'resume_id',
        'status',
        'message',
    ];

    protected $casts = [
        'status'     => RespondStatus::class,
        'created_at' => DateTimeImmutableCast::class,
        'updated_at' => DateTimeImmutableCast::class,
    ];

    public function vacancy() {
        return $this->belongsTo(Vacancies::class);
    }

    public function resume() {
        return $this->belongsTo(Resume::class);
    }
}
