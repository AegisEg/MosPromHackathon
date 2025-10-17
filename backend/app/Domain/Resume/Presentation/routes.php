<?php
declare(strict_types=1);

use App\Domain\Resume\Presentation\Controllers\ResumeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Resume Domain Routes
|--------------------------------------------------------------------------
|
| Здесь определены все маршруты для домена Resume.
| Все маршруты защищены аутентификацией через Laravel Sanctum.
|
*/

Route::group(['prefix' => 'resume'], function () {
    Route::get('/{id}', [ResumeController::class, 'show'])
        ->name('resume.show');

    Route::group(['middleware' => ['auth:sanctum']], function () {
        Route::post('/store', [ResumeController::class, 'store'])
            ->name('resume.store')->middleware('seeker');
        Route::patch('/update/{id}', [ResumeController::class, 'update'])
            ->name('resume.update');
        Route::delete('/delete/{id}', [ResumeController::class, 'destroy'])
            ->name('resume.destroy');
    });
});
