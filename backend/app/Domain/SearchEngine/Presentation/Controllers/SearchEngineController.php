<?php
declare(strict_types=1);

namespace App\Domain\SearchEngine\Presentation\Controllers;

use App\Domain\SearchEngine\Application\Action\VacanciesSearchAction;
use App\Domain\SearchEngine\Application\Action\InternshipsSearchAction;
use App\Domain\SharedKernel\Responses\Error;
use App\Domain\SharedKernel\Responses\ParentResponse;
use App\Domain\SharedKernel\Responses\StatusEnum;
use App\Http\Controllers\Controller;
use App\Models\Vacancies;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Throwable;

class SearchEngineController extends Controller {
    private VacanciesSearchAction $vacanciesSearchAction;
    private InternshipsSearchAction $internshipsSearchAction;

    public function __construct() {
        $this->vacanciesSearchAction = new VacanciesSearchAction();
        $this->internshipsSearchAction = new InternshipsSearchAction();
    }
    
    /**
     * Поиск вакансий
     */
    public function searchVacancies(Request $request): JsonResponse {
        try {
            $queryArray = $request->query();
            $vacanciesResult = $this->vacanciesSearchAction->searchVacancies($queryArray);
            return (new ParentResponse(
                data: $vacanciesResult,
                httpStatus: 200,
                status: StatusEnum::OK,
            ))->toResponse();
        } catch (Throwable $e) {
            $debugInfo = [
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ];
            return (new ParentResponse(
                error: new Error(code: $e->getCode(), message: $e->getMessage()),
                httpStatus: 500,
                status: StatusEnum::FAIL,
                debugInfo: $debugInfo,
            ))->toResponse();
        }
    }
    
    /**
     * Поиск стажировок
     */
    public function searchInternships(Request $request): JsonResponse {
        try {
            $queryArray = $request->query();
            $internshipsResult = $this->internshipsSearchAction->searchInternships($queryArray);
            return (new ParentResponse(
                data: $internshipsResult,
                httpStatus: 200,
                status: StatusEnum::OK,
            ))->toResponse();
        } catch (Throwable $e) {
            $debugInfo = [
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ];
            return (new ParentResponse(
                error: new Error(code: $e->getCode(), message: $e->getMessage()),
                httpStatus: 500,
                status: StatusEnum::FAIL,
                debugInfo: $debugInfo,
            ))->toResponse();
        }
    }
}