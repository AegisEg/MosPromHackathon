<?php
declare(strict_types=1);

use App\Domain\Company\Presentation\Controller\CompanyController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'companies'], function () {
    Route::get('/{id}', [CompanyController::class, 'show'])
        ->name('companies.show');

    Route::post('/store', [CompanyController::class, 'store'])
        ->name('companies.store');

    Route::patch('/update/{id}', [CompanyController::class, 'update'])
        ->name('companies.update');

    Route::delete('/delete/{id}', [CompanyController::class, 'destroy'])
        ->name('companies.destroy');
});