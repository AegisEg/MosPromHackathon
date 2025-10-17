<?php

declare(strict_types=1);

use App\Domain\Profession\Presentation\Controllers\ProfessionController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'professions'], function () {
    Route::get('/', [ProfessionController::class, 'index'])
        ->name('professions.index');
    Route::get('/{id}', [ProfessionController::class, 'show'])
        ->name('professions.show');
    Route::get('/{id}/skills', [ProfessionController::class, 'skills'])
        ->name('professions.skills');
});
