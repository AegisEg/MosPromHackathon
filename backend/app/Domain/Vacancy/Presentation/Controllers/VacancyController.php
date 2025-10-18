<?php
declare(strict_types=1);

namespace App\Domain\Vacancy\Presentation\Controllers;

use App\Domain\SharedKernel\Responses\Error;
use App\Domain\SharedKernel\Responses\ParentResponse;
use App\Domain\SharedKernel\Responses\StatusEnum;
use App\Domain\Vacancy\Application\Action\VacancyAction;
use App\Domain\Vacancy\Application\Exceptions\ForbiddenVacancyException;
use App\Domain\Vacancy\Application\Exceptions\VacancyNotFoundException;
use App\Domain\Vacancy\Presentation\Events\CreateVacancyEvent;
use App\Domain\Vacancy\Presentation\Events\UpdateVacancyEvent;
use App\Domain\Vacancy\Presentation\Requests\CreateVacancyRequest;
use App\Domain\Vacancy\Presentation\Requests\UpdateVacancyRequest;
use App\Http\Controllers\Controller;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Throwable;

class VacancyController extends Controller
{
    public function index(Request $request): JsonResponse {
        $user = $request->user();
        try {
            $vacancies = (new VacancyAction())->getVacanciesByUser($user);
            return (new ParentResponse(
                data: $vacancies,
                httpStatus: 200,
                status: StatusEnum::OK,
            ))->toResponse();
        } catch (VacancyNotFoundException $e) {
            $debugInfo = [
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ];
            return (new ParentResponse(
                error: new Error(code: $e->getCode(), message: 'Вакансии не найдены'),
                httpStatus: 404,
                debugInfo: $debugInfo,
                status: StatusEnum::FAIL,
            ))->toResponse();
        } catch (Throwable $e) {
            $debugInfo = [
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ];
            return (new ParentResponse(
                error: new Error(code: $e->getCode(), message: 'Непредвиденная ошибка при получении вакансий'),
                httpStatus: 500,
                debugInfo: $debugInfo,
                status: StatusEnum::FAIL,
            ))->toResponse();
        }
    }
    public function show(int $idVacancy): JsonResponse {
        try {
            $vacancy = (new VacancyAction())->show($idVacancy);

            CreateVacancyEvent::dispatch($idVacancy);

            return (new ParentResponse(
                data: $vacancy->toArray(),
            ))->toResponse();
        } catch (VacancyNotFoundException $e) {
            return (new ParentResponse(
                error: new Error(code: $e->getCode(), message: $e->getMessage()),
                httpStatus: 404,
                status: StatusEnum::FAIL,
            ))->toResponse();
        } catch (Throwable $e) {
            return (new ParentResponse(
                error: new Error(code: $e->getCode(), message: $e->getMessage()),
                httpStatus: 500,
                status: StatusEnum::FAIL,
            ))->toResponse();
        }
    }

    public function create(CreateVacancyRequest $request): JsonResponse {
        try {
            $user      = $request->user();
            $idVacancy = (new VacancyAction())->create($user, $request->validated());
            CreateVacancyEvent::dispatch($idVacancy);

            return (new ParentResponse(
                status: StatusEnum::OK,
                httpStatus: 204,
            ))->toResponse();
        } catch (QueryException $e) {
            $message = 'Ошибка при создании вакансии. Некорректно переданы данные.';

            return (new ParentResponse(
                error: new Error(code: $e->getCode(), message: $message),
                httpStatus: 400,
                status: StatusEnum::FAIL,
                debugInfo: [
                    'exceptionMessage' => $e->getMessage(),
                ],
            ))->toResponse();
        } catch (Throwable $e) {
            return (new ParentResponse(
                error: new Error(code: $e->getCode(), message: $e->getMessage()),
                httpStatus: 500,
                status: StatusEnum::FAIL,
            ))->toResponse();
        }
    }

    public function update(int $idVacancy, UpdateVacancyRequest $request): JsonResponse {
        $user         = $request->user();
        $vacancyArray = $request->validated();

        try {
            $idVacancy = (new VacancyAction())->update($user, $idVacancy, $vacancyArray);
            UpdateVacancyEvent::dispatch($idVacancy);

            return (new ParentResponse(
                status: StatusEnum::OK,
                httpStatus: 204,
            ))->toResponse();
        } catch (ForbiddenVacancyException $e) {
            return (new ParentResponse(
                error: new Error(code: $e->getCode(), message: $e->getMessage()),
                httpStatus: 403,
                status: StatusEnum::FAIL,
            ))->toResponse();
        } catch (VacancyNotFoundException $e) {
            return (new ParentResponse(
                error: new Error(code: $e->getCode(), message: $e->getMessage()),
                httpStatus: 404,
                status: StatusEnum::FAIL,
            ))->toResponse();
        } catch (Throwable $e) {
            return (new ParentResponse(
                error: new Error(code: $e->getCode(), message: $e->getMessage()),
                httpStatus: 500,
                status: StatusEnum::FAIL,
            ))->toResponse();
        }
    }

    public function delete(int $idVacancy, Request $request): JsonResponse {
        $user = $request->user();
        try {
            (new VacancyAction())->delete($user, $idVacancy);

            return (new ParentResponse(
                status: StatusEnum::OK,
                httpStatus: 204,
            ))->toResponse();
        } catch (ForbiddenVacancyException $e) {
            return (new ParentResponse(
                error: new Error(code: $e->getCode(), message: $e->getMessage()),
                httpStatus: 403,
                status: StatusEnum::FAIL,
            ))->toResponse();
        } catch (VacancyNotFoundException $e) {
            return (new ParentResponse(
                error: new Error(code: $e->getCode(), message: $e->getMessage()),
                httpStatus: 404,
                status: StatusEnum::FAIL,
            ))->toResponse();
        } catch (Throwable $e) {
            return (new ParentResponse(
                error: new Error(code: $e->getCode(), message: $e->getMessage()),
                httpStatus: 500,
                status: StatusEnum::FAIL,
            ))->toResponse();
        }
    }
}
