<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Companies extends Model
{
    protected $table = 'companies';

    protected $fillable = [
        'user_id',
        'name',
        'description',
        'website',
        'size',
        'city',
        'country',
        'logo_url'
    ];

    /**
     * Связь с пользователем (владелец компании)
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Связь многие ко многим с отраслями
     */
    public function industries(): BelongsToMany
    {
        return $this->belongsToMany(Industries::class, 'company_industry', 'company_id', 'industry_id');
    }

    /**
     * Связь с вакансиями компании
     */
    public function vacancies()
    {
        return $this->hasMany(Vacancies::class);
    }
}
