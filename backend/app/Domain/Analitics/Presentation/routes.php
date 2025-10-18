<?php
declare(strict_types=1);

use App\Domain\Analitics\Presentation\Controllers\StatisticController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'analitics', 'middleware' => ['auth:sanctum']], function () {
    Route::post('/top-professions-resume', [StatisticController::class, 'getTopProfessionsResume'])
        ->name('statistics.top_professions_resume')->middleware('admin');
    Route::post('/top-skills-resume', [StatisticController::class, 'getTopSkillsResume'])
        ->name('statistics.top_skills_resume')->middleware('admin');
    Route::post('/salary-resume', [StatisticController::class, 'salariesResume'])
        ->name('statistics.avg_median_salary_resume')->middleware('admin');
    Route::post('/experience-resume', [StatisticController::class, 'experienceResume'])
        ->name('statistics.experience_resume')->middleware('admin');

    Route::group(['middleware' => ['company']], function () {
        Route::get('/avarage-count-responds', [StatisticController::class, 'avarageCountRespondsVacancy'])
            ->name('statistics.avarage_count_responds');

        Route::get('/average-median-salary-responds', [StatisticController::class, 'averageMedianSalaryResponds'])
            ->name('statistics.average_median_salary_responds');

        Route::get('/responds-status-stats', [StatisticController::class, 'respondsStatusStats'])
            ->name('statistics.responds_status_stats');

        Route::get('/average-age-responds', [StatisticController::class, 'averageAgeResponds'])
            ->name('statistics.average_age_responds');

        Route::get('/responds-timeline', [StatisticController::class, 'respondsTimeline'])
            ->name('statistics.responds_timeline');
    });
});
