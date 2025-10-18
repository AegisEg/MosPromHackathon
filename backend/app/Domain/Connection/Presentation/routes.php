<?php
declare(strict_types=1);

use App\Domain\Connection\Presentation\Controllers\ChatController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'chat','middleware' => ['auth:sanctum']], function () {
    Route::get('/', [ChatController::class, 'index'])
        ->name('chat.index');
    Route::get('/{id}', [ChatController::class, 'show'])
        ->name('chat.show');
    Route::post('/{id}/message', [ChatController::class, 'sendMessage'])
        ->name('chat.send-message');
});
