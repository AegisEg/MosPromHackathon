<?php
declare(strict_types=1);

namespace App\Domain\RespondAndInteraction\Presentation\Routes;

use App\Domain\RespondAndInteraction\Presentation\Controllers\RespondAndInteractionController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'responds'], function () {
    Route::group(['middleware' => ['auth:sanctum']], function () {
        Route::get('/show/{vacancyId}', [RespondAndInteractionController::class, 'show'])
            ->name('responds.show')->middleware('company');
    });
});
