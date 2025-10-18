<?php
declare(strict_types=1);

namespace App\Models;

use App\Casts\DateTimeImmutableCast;
use Illuminate\Database\Eloquent\Model;
use App\Enums\EmploymentType;
use App\Enums\ExperienceLevel;

class Vacancies extends Model
{
    protected $table = 'vacancies';

    protected $fillable = [
        'company_id',
        'title',
        'profession_id',
        'description',
        'employment_type',
        'experience_wide',
        'salary_from',
        'salary_to',
        'status',
        'user_id',
    ];

    protected $casts = [
        'employment_type' => EmploymentType::class,
        'experience_wide' => ExperienceLevel::class,
        'created_at'      => DateTimeImmutableCast::class,
        'updated_at'      => DateTimeImmutableCast::class,
    ];

    /**
     * Связь с компанией
     */
    public function company() {
        return $this->belongsTo(Companies::class);
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
        return $this->belongsToMany(Skills::class, 'vacancy_skill', 'vacancy_id', 'skill_id');
    }

    /**
     * Связь с резюме
     */
    public function responds() {
        return $this->hasMany(Responds::class, 'vacancy_id', 'id');
    }

    /**
     * Связь с пользователем
     */
    public function user() {
        return $this->belongsTo(User::class);
    }
}
