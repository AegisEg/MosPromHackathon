<?php

namespace App\Models;

use App\Casts\DateTimeImmutableCast;
use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    protected $table = 'educations';

    protected $fillable = [
        'resume_id',
        'institution_name',
        'degree',
        'specialization',
        'start_date',
        'end_date',
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
