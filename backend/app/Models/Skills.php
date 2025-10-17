<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Skills extends Model
{
    protected $table = 'skills';

    protected $fillable = [
        'name',
    ];

    /**
     * Связь многие ко многим с профессиями
     */
    public function professions()
    {
        return $this->belongsToMany(Professions::class, 'profession_skill', 'skill_id', 'profession_id');
    }

    /**
     * Связь многие ко многим с резюме
     */
    public function resumes()
    {
        return $this->belongsToMany(Resume::class, 'resume_skill', 'skill_id', 'resume_id');
    }

    /**
     * Связь многие ко многим с вакансиями
     */
    public function vacancies()
    {
        return $this->belongsToMany(Vacancies::class, 'vacancy_skill', 'skill_id', 'vacancy_id');
    }
}
