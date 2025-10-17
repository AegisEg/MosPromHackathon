<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Industries extends Model
{
    protected $table = 'industries';

    protected $fillable = [
        'name'
    ];

    /**
     * Связь многие ко многим с компаниями
     */
    public function companies(): BelongsToMany
    {
        return $this->belongsToMany(Companies::class, 'company_industry', 'industry_id', 'company_id');
    }
}
