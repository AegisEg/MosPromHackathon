<?php

namespace App\Models;

use App\Casts\DateTimeImmutableCast;
use Illuminate\Database\Eloquent\Model;

class Experiences extends Model
{
    protected $table = 'experiences';

    protected $fillable = [
        'resume_id',
        'company_name',
        'position',
        'start_date',
        'end_date',
        'description',
    ];

    protected $casts = [ // phpcs:ignore
        'start_date'   => DateTimeImmutableCast::class,
        'end_date' => DateTimeImmutableCast::class,
    ];

    public function resume()
    {
        return $this->belongsTo(Resume::class);
    }
}
