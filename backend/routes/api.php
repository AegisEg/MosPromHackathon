<?php
declare(strict_types=1);

// Подключение маршрутов доменов

// Подключаем маршруты домена Resume
require app_path('Domain/Resume/Presentation/routes.php');
require app_path('Domain/Vacancy/Presentation/routes.php');
require app_path('Domain/User/Presentation/routes.php');
require app_path('Domain/Company/Presentation/routes.php');
require app_path('Domain/Profession/Presentation/routes.php');
require app_path('Domain/Internship/Presentation/routes.php');
require app_path('Domain/Analitics/Presentation/routes.php');
require app_path('Domain/SearchEngine/Presentation/routes.php');
require app_path('Domain/RespondAndInteraction/Presentation/route.php');
