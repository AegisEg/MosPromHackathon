<?php
declare(strict_types=1);

namespace App\Domain\SearchEngine\Application\Action;

use App\Models\Vacancies;
use App\Domain\AssistantAI\Services\SemanticSearchService;

/**
 * Класс для поиска вакансий
 */
class VacanciesSearchAction {

    public function searchVacancies(array $queryArray): array {
        $query = Vacancies::query()->with('company:id,name,logo_url');

        $query->where('status', true);

        if (isset($queryArray['company_id'])) {
            $query->where('company_id', $queryArray['company_id']);
        }

        if (isset($queryArray['profession_id'])) {
            $query->where('profession_id', $queryArray['profession_id']);
        }

        if (isset($queryArray['description'])) {
            $query->where('description', 'like', '%' . $queryArray['description'] . '%');
        }

        if (isset($queryArray['employment_type'])) {
            $query->where('employment_type', $queryArray['employment_type']);
        }

        if (isset($queryArray['experience_wide'])) {
            $query->where('experience_wide', $queryArray['experience_wide']);
        }

        if (isset($queryArray['salary_from'])) {
            $query->where('salary_from', '>=', $queryArray['salary_from']);
        }

        if (isset($queryArray['salary_to'])) {
            $query->where('salary_to', '<=', $queryArray['salary_to']);
        }

        if (isset($queryArray['user_id'])) {
            $query->where('user_id', $queryArray['user_id']);
        }

        if (isset($queryArray['skills'])) {
            $skillsIdArray = explode(',', $queryArray['skills']);
            $query->whereHas('skills', function ($q) use ($skillsIdArray) {
                $q->whereIn('skills.id', $skillsIdArray);
            });
        }
        

        if (isset($queryArray['title'])) {
            $vacanciesIdAfterFilter = $query->get(['id']);
            $vacanciesIdAfterTitle = $query->where('title', 'ilike', '%' . $queryArray['title'] . '%')
                  ->whereIn('id', $vacanciesIdAfterFilter)->get('id');

            $queryAfterTitle = Vacancies::query()->with('company:id,name,logo_url');

            $vacanciesIdNotTitle = $queryAfterTitle->where('title', 'not ilike', '%' . $queryArray['title'] . '%')
            ->whereIn('id', $vacanciesIdAfterFilter)->get(['id', 'title']);

            $notTitleList = $vacanciesIdNotTitle->pluck('title', 'id')->toArray();

            $semantic = new SemanticSearchService();
            $semanticResult = $semantic->search($queryArray['title'], $notTitleList);

            $vacanciesIdAfterFilterArray = $vacanciesIdAfterTitle->pluck('id')->toArray();
            if ($semanticResult) {
                $vacancies = array_merge($vacanciesIdAfterFilterArray, $semanticResult);
                $vacanciesById = Vacancies::with('company:id,name,logo_url')->whereIn('id', $vacancies)->get();
                $vacancies = $vacanciesById;
            } else {
                $vacancies = Vacancies::with('company:id,name,logo_url')->whereIn('id', $vacanciesIdAfterTitle)->get();
            }

        } else {
            $vacancies = $query->get();
        }

        $resultList = [
            'total' => $vacancies->count(),
            'vacancies' => $vacancies->toArray(),
        ];
        return $resultList;
    }
}