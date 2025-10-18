<?php
declare(strict_types=1);

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});

// Подключение маршрутов доменов

// Подключаем маршруты домена Resume
require app_path('Domain/Resume/Presentation/routes.php');
require app_path('Domain/Vacancy/Presentation/routes.php');
require app_path('Domain/User/Presentation/routes.php');
require app_path('Domain/Company/Presentation/routes.php');
require app_path('Domain/Profession/Presentation/routes.php');
require app_path('Domain/Internship/Presentation/routes.php');
require app_path('Domain/SearchEngine/Presentation/routes.php');
