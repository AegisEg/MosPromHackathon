<?php
declare(strict_types=1);

namespace App\Domain\Internship\Presentation\Controllers;

use App\Domain\SharedKernel\Responses\Error;
use App\Domain\SharedKernel\Responses\ParentResponse;
use App\Domain\SharedKernel\Responses\StatusEnum;
use App\Domain\Internship\Application\Action\InternshipAction;
use App\Domain\Internship\Application\DTO\CreateUpdateInputDTO;
use App\Domain\Internship\Application\Exceptions\ForbiddenInternshipException;
use App\Domain\Internship\Application\Exceptions\InternshipNotFoundException;
use App\Domain\Internship\Presentation\Events\CreateInternshipEvent;
use App\Domain\Internship\Presentation\Events\NewInternshipRespondEvent;
use App\Domain\Internship\Presentation\Events\ShowInternshipEvent;
use App\Domain\Internship\Presentation\Events\UpdateInternshipEvent;
use App\Domain\Internship\Presentation\Requests\CreateInternshipRequest;
use App\Domain\Internship\Presentation\Requests\UpdateInternshipRequest;
use App\Http\Controllers\Controller;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Throwable;

class InternshipController extends Controller
{
    public function index(Request $request): JsonResponse {
        try {
            $internshipsDTOs = (new InternshipAction())->internshipList();
            $internships     = [];

            foreach ($internshipsDTOs as $internshipDTO) {
                $internships[] = $internshipDTO->toArray();
            }

            return (new ParentResponse(
                data: $internships,
                httpStatus: 200,
                status: StatusEnum::OK,
            ))->toResponse();
        } catch (Throwable $e) {
            $debugInfo = [
                'error' => $e->getMessage(),
                'file'  => $e->getFile(),
                'line'  => $e->getLine(),
            ];

            return (new ParentResponse(
                error: new Error(code: $e->getCode(), message: 'Непредвиденная ошибка при получении стажировок'),
                httpStatus: 500,
                debugInfo: $debugInfo,
                status: StatusEnum::FAIL,
            ))->toResponse();
        }
    }

    public function show(int $idInternship): JsonResponse {
        try {
            $internship = (new InternshipAction())->show($idInternship);

            ShowInternshipEvent::dispatch($idInternship);

            return (new ParentResponse(
                data: $internship->toArray(),
            ))->toResponse();
        } catch (InternshipNotFoundException $e) {
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

    public function create(CreateInternshipRequest $request): JsonResponse {
        $user = $request->user();
        try {
            $internshipData = new CreateUpdateInputDTO(
                speciality: $request->input('speciality'),
                countStudents: $request->input('count_students'),
                startDatePeriod: $request->input('start_date_period'),
                endDatePeriod: $request->input('end_date_period'),
            );
            $idInternship = (new InternshipAction())->create($user, $internshipData);
            CreateInternshipEvent::dispatch($idInternship);

            return (new ParentResponse(
                status: StatusEnum::OK,
                httpStatus: 204,
            ))->toResponse();
        } catch (QueryException $e) {
            $message = 'Ошибка при создании стажировки. Некорректно переданы данные.';

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

    public function update(int $idInternship, UpdateInternshipRequest $request): JsonResponse {
        $user            = $request->user();
        $internshipArray = $request->validated();

        try {
            $internshipData = new CreateUpdateInputDTO(
                speciality: $request->input('speciality'),
                countStudents: $request->input('count_students'),
                startDatePeriod: $request->input('start_date_period'),
                endDatePeriod: $request->input('end_date_period'),
            );
            $idInternship = (new InternshipAction())->update($user, $idInternship, $internshipData);
            UpdateInternshipEvent::dispatch($idInternship);

            return (new ParentResponse(
                status: StatusEnum::OK,
                httpStatus: 204,
            ))->toResponse();
        } catch (ForbiddenInternshipException $e) {
            return (new ParentResponse(
                error: new Error(code: $e->getCode(), message: $e->getMessage()),
                httpStatus: 403,
                status: StatusEnum::FAIL,
            ))->toResponse();
        } catch (InternshipNotFoundException $e) {
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

    public function delete(int $idInternship, Request $request): JsonResponse {
        $user = $request->user();
        try {
            (new InternshipAction())->delete($user, $idInternship);

            return (new ParentResponse(
                status: StatusEnum::OK,
                httpStatus: 204,
            ))->toResponse();
        } catch (ForbiddenInternshipException $e) {
            return (new ParentResponse(
                error: new Error(code: $e->getCode(), message: $e->getMessage()),
                httpStatus: 403,
                status: StatusEnum::FAIL,
            ))->toResponse();
        } catch (InternshipNotFoundException $e) {
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

    public function respond(int $idInternship, Request $request): JsonResponse {
        $user    = $request->user();
        $message = $request->input('message');
        try {
            $respondId = (new InternshipAction())->respond($idInternship, $user, $message);
            NewInternshipRespondEvent::dispatch($respondId);

            return (new ParentResponse(
                status: StatusEnum::OK,
                httpStatus: 204,
            ))->toResponse();
        } catch (ForbiddenInternshipException $e) {
            return (new ParentResponse(
                error: new Error(code: $e->getCode(), message: $e->getMessage()),
                httpStatus: 403,
                status: StatusEnum::FAIL,
            ))->toResponse();
        } catch (InternshipNotFoundException $e) {
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
