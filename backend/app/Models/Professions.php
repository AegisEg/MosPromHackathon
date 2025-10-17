<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Professions extends Model
{
    protected $table = 'professions';

    protected $fillable = [
        'name',
    ];

    /**
     * Связь с резюме
     */
    public function resumes()
    {
        return $this->hasMany(Resume::class);
    }

    /**
     * Связь с вакансиями
     */
    public function vacancies()
    {
        return $this->hasMany(Vacancies::class);
    }

    /**
     * Связь многие ко многим с навыками
     */
    public function skills()
    {
        return $this->belongsToMany(Skills::class, 'profession_skill', 'profession_id', 'skill_id');
    }
}
