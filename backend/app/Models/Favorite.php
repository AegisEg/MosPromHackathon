<?php
declare(strict_types=1);

namespace App\Models;

use App\Casts\DateTimeImmutableCast;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Favorite extends Model
{
    protected $table = 'favorites';

    protected $fillable = [
        'vacancy_id',
        'resume_id',
    ];

    protected $casts = [
        'created_at' => DateTimeImmutableCast::class,
        'updated_at' => DateTimeImmutableCast::class,
    ];

    /**
     * Связь с вакансией
     */
    public function vacancy(): BelongsTo
    {
        return $this->belongsTo(Vacancies::class);
    }

    /**
     * Связь с резюме
     */
    public function resume(): BelongsTo
    {
        return $this->belongsTo(Resume::class);
    }
}
