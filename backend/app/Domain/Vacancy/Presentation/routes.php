<?php
declare(strict_types=1);

use App\Domain\Vacancy\Presentation\Controllers\VacancyController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'vacancies'], function () {
    Route::get('/{idVacancy}', [VacancyController::class, 'show'])
        ->name('vacancies.show');
    Route::group(['middleware' => ['auth:sanctum']], function () {
        Route::get('/', [VacancyController::class, 'index'])
            ->name('vacancies.index');
        Route::post('/', [VacancyController::class, 'create'])
            ->name('vacancies.create')->middleware('company');
        Route::put('/{idVacancy}', [VacancyController::class, 'update'])
            ->name('vacancies.update');
        Route::delete('/{idVacancy}', [VacancyController::class, 'delete']);
        Route::post('/{idVacancy}/respond', [VacancyController::class, 'respond'])
            ->name('vacancies.respond')->middleware('seeker');
    });
});
