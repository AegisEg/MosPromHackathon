<?php

namespace App\Models;

use App\Casts\DateTimeImmutableCast;
use Illuminate\Database\Eloquent\Model;

class Resume extends Model
{
    protected $table = 'resumes';

    protected $fillable = [
        'user_id',
        'date_of_birth',
        'city',
        'country',
        'education',
        'phone',
        'about',
        'profession_id',
        'salary',
        'status',
    ];

    protected $casts = [ // phpcs:ignore
        'date_of_birth' => DateTimeImmutableCast::class,
        'created_at' => DateTimeImmutableCast::class,
        'updated_at' => DateTimeImmutableCast::class,
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function experiences()
    {
        return $this->hasMany(Experiences::class);
    }

    public function educations()
    {
        return $this->hasMany(Education::class);
    }

    /**
     * Связь с профессией
     */
    public function profession()
    {
        return $this->belongsTo(Professions::class);
    }

    /**
     * Связь многие ко многим с навыками
     */
    public function skills()
    {
        return $this->belongsToMany(Skills::class, 'resume_skill', 'resume_id', 'skill_id');
    }
}
