<?php
declare(strict_types=1);

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
        'created_at'    => DateTimeImmutableCast::class,
        'updated_at'    => DateTimeImmutableCast::class,
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function experiences() {
        return $this->hasMany(Experiences::class);
    }

    public function educations() {
        return $this->hasMany(Education::class);
    }

    public function responds() {
        return $this->hasMany(Responds::class, 'resume_id', 'id');
    }

    /**
     * Связь с профессией
     */
    public function profession() {
        return $this->belongsTo(Professions::class);
    }

    /**
     * Связь многие ко многим с навыками
     */
    public function skills() {
        return $this->belongsToMany(Skills::class, 'resume_skill', 'resume_id', 'skill_id');
    }

    /**
     * Связь многие ко многим с вакансиями через избранное
     */
    public function favoriteVacancies()
    {
        return $this->belongsToMany(Vacancies::class, 'favorites', 'resume_id', 'vacancy_id');
    }

    /**
     * Связь с избранными вакансиями
     */
    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }
}
