<?php
declare(strict_types=1);

use App\Domain\Internship\Presentation\Controllers\InternshipController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'internships'], function () {
    Route::get('/{idInternship}', [InternshipController::class, 'show'])
        ->name('internships.show');
    Route::group(['middleware' => ['auth:sanctum']], function () {
        Route::get('/', [InternshipController::class, 'index'])
            ->name('index');
        Route::post('/', [InternshipController::class, 'create'])
            ->name('internships.create')->middleware('institute');
        Route::put('/{idInternship}', [InternshipController::class, 'update'])
            ->name('internships.update');
        Route::delete('/{idInternship}', [InternshipController::class, 'delete'])
            ->name('internships.delete');
        Route::post('/{idInternship}/respond', [InternshipController::class, 'respond'])
            ->name('internships.respond')->middleware('company');
    });
});
