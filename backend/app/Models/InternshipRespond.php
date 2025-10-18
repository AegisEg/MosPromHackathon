<?php
declare(strict_types=1);

namespace App\Models;

use App\Casts\DateTimeImmutableCast;
use App\Domain\RespondAndInteraction\Enums\RespondStatus;
use Illuminate\Database\Eloquent\Model;

class InternshipRespond extends Model
{
    protected $table = 'internship_responds';

    protected $fillable = [
        'internship_id',
        'company_id',
        'status',
        'message',
    ];

    protected $casts = [ // phpcs:ignore
        'status'     => RespondStatus::class,
        'created_at' => DateTimeImmutableCast::class,
        'updated_at' => DateTimeImmutableCast::class,
    ];

    public function internship() {
        return $this->belongsTo(Internship::class);
    }

    public function company() {
        return $this->belongsTo(Companies::class);
    }
}


