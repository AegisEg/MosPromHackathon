<?php
declare(strict_types=1);

namespace App\Domain\SearchEngine\Application\Action;

use App\Models\Internship;
use App\Domain\AssistantAI\Services\SemanticSearchService;

/**
 * Класс для поиска стажировок
 */
class InternshipsSearchAction {

    public function searchInternships(array $queryArray): array {
        $query = Internship::query()->with('user:id,name');

        // Фильтр по пользователю
        if (isset($queryArray['user_id'])) {
            $query->where('user_id', $queryArray['user_id']);
        }

        // Фильтр по количеству студентов (минимум)
        if (isset($queryArray['count_students_from'])) {
            $query->where('count_students', '>=', (int)$queryArray['count_students_from']);
        }

        // Фильтр по количеству студентов (максимум)
        if (isset($queryArray['count_students_to'])) {
            $query->where('count_students', '<=', (int)$queryArray['count_students_to']);
        }

        // Фильтр по дате начала стажировки (от)
        if (isset($queryArray['start_date_from'])) {
            $query->where('start_date_period', '>=', $queryArray['start_date_from']);
        }

        // Фильтр по дате начала стажировки (до)
        if (isset($queryArray['start_date_to'])) {
            $query->where('start_date_period', '<=', $queryArray['start_date_to']);
        }

        // Фильтр по дате окончания стажировки (от)
        if (isset($queryArray['end_date_from'])) {
            $query->where('end_date_period', '>=', $queryArray['end_date_from']);
        }

        // Фильтр по дате окончания стажировки (до)
        if (isset($queryArray['end_date_to'])) {
            $query->where('end_date_period', '<=', $queryArray['end_date_to']);
        }

        // Поиск по специальности (с семантическим поиском)
        if (isset($queryArray['speciality'])) {
            $internshipsIdAfterFilter = $query->get(['id']);
            $internshipsIdAfterSpeciality = $query->where('speciality', 'ilike', '%' . $queryArray['speciality'] . '%')
                  ->whereIn('id', $internshipsIdAfterFilter)->get('id');

            $queryAfterSpeciality = Internship::query()->with('user:id,name');

            $internshipsIdNotSpeciality = $queryAfterSpeciality->where('speciality', 'not ilike', '%' . $queryArray['speciality'] . '%')
            ->whereIn('id', $internshipsIdAfterFilter)->get(['id', 'speciality']);

            $notSpecialityList = $internshipsIdNotSpeciality->pluck('speciality', 'id')->toArray();

            $semantic = new SemanticSearchService();
            $semanticResult = $semantic->search($queryArray['speciality'], $notSpecialityList);

            $internshipsIdAfterFilterArray = $internshipsIdAfterSpeciality->pluck('id')->toArray();
            if ($semanticResult) {
                $internships = array_merge($internshipsIdAfterFilterArray, $semanticResult);
                $internshipsById = Internship::with('user:id,name')->whereIn('id', $internships)->get();
                $internships = $internshipsById;
            } else {
                $internships = Internship::with('user:id,name')->whereIn('id', $internshipsIdAfterSpeciality)->get();
            }

        } else {
            $internships = $query->get();
        }

        $resultList = [
            'total' => $internships->count(),
            'internships' => $internships->toArray(),
        ];
        return $resultList;
    }
}

