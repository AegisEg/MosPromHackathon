<?php
declare(strict_types=1);

use App\Domain\User\Presentation\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'auth'], function () {
    Route::post('/login', [AuthController::class, 'login'])
        ->name('auth.login');
    Route::post('/register', [AuthController::class, 'register'])->name('register');

    Route::group(['middleware' => ['auth:sanctum']], function () {
        Route::post('/logout', [AuthController::class, 'logout'])
            ->name('logout');
    });
});
