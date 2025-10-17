<?php
declare(strict_types=1);

namespace App\Domain\SearchEngine\Application\Action;

use App\Models\Vacancies;

class VacanciesSearchAction {

    public function searchVacancies(Request $request): array {
        return Vacancies::all();
    }
}