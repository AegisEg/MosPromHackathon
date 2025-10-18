<?php
declare(strict_types=1);

use App\Domain\SearchEngine\Presentation\Controllers\SearchEngineController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'search/vacancies'], function () {
    Route::get('/', [SearchEngineController::class, 'searchVacancies'])
        ->name('search.vacancies.search');

    Route::group(['middleware' => ['auth:sanctum']], function () {
        Route::get('/favorites', [SearchEngineController::class, 'searchFavoritesVacancies'])
            ->name('search.vacancies.search.favorites');
    });
});

Route::group(['prefix' => 'search/internships'], function () {
    Route::get('/', [SearchEngineController::class, 'searchInternships'])
        ->name('search.internships.search');
});