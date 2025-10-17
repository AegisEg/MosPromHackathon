<?php
declare(strict_types=1);

use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'search/vacancies'], function () {
    Route::get('/', [SearchEngineController::class, 'searchVacancies'])
        ->name('search.vacancies.search');
});