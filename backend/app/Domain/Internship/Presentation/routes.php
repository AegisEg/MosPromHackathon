<?php
declare(strict_types=1);

use App\Domain\Internship\Presentation\Controllers\InternshipController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'internships'], function () {
    Route::get('/{idInternship}', [InternshipController::class, 'show'])
        ->name('internships.show');
    Route::group(['middleware' => ['auth:sanctum']], function () {
        Route::post('/', [InternshipController::class, 'create'])
            ->name('internships.create');
        Route::put('/{idInternship}', [InternshipController::class, 'update'])
            ->name('internships.update');
        Route::delete('/{idInternship}', [InternshipController::class, 'delete'])
            ->name('internships.delete');
    });
});
