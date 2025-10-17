<?php
declare(strict_types=1);

namespace App\Domain\SearchEngine\Presentation\Controllers;

use App\Domain\SearchEngine\Application\Action\VacanciesSearchAction;
use App\Domain\SharedKernel\Responses\ParentResponse;
use App\Domain\SharedKernel\Responses\StatusEnum;
use App\Http\Controllers\Controller;
use App\Models\Vacancies;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class SearchEngineController extends Controller {
    private VacanciesSearchAction $vacanciesSearchAction;

    public function __construct() {
        $this->vacanciesSearchAction = new VacanciesSearchAction();
    }
    /**
     * Поиск вакансий
     */
    public function searchVacancies(Request $request): JsonResponse {
        try {
            $query = $request->query('query') ?? '';
            $vacanciesList = $this->vacanciesSearchAction->searchVacancies($query);
        } catch (Throwable $e) {
            return (new ParentResponse(
                error: new Error(code: $e->getCode(), message: $e->getMessage()),
                httpStatus: 500,
                status: StatusEnum::FAIL,
            ))->toResponse();
        }

        return (new ParentResponse(
            data: ['vacancies' => $vacanciesList],
            httpStatus: 200,
            status: StatusEnum::OK,
        ))->toResponse();
    }
}