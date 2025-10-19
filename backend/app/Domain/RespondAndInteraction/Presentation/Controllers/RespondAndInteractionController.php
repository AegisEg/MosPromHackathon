<?php
declare(strict_types=1);

namespace App\Domain\RespondAndInteraction\Presentation\Controllers;

use App\Domain\RespondAndInteraction\Application\Action\RespondAndInteractionAction;
use App\Domain\RespondAndInteraction\Application\Exceptions\ForbiddenRespondException;
use App\Domain\RespondAndInteraction\Application\Exceptions\RespondNotFoundException;
use App\Domain\Company\Application\Exceptions\NotFoundCompanyException;
use App\Domain\SharedKernel\Responses\Error;
use App\Domain\SharedKernel\Responses\ParentResponse;
use App\Domain\SharedKernel\Responses\StatusEnum;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Throwable;

class RespondAndInteractionController extends Controller
{
    private RespondAndInteractionAction $respondAndInteractionAction;

    public function __construct() {
        $this->respondAndInteractionAction = new RespondAndInteractionAction();
    }

    public function show(int $vacancyId, Request $request): JsonResponse {
        $user = $request->user();
        try {
            $responds = $this->respondAndInteractionAction->getRespondsByVacancy($user, $vacancyId);

            return (new ParentResponse(
                data: ['responds' => $responds],
                httpStatus: 200,
                status: StatusEnum::OK,
            ))->toResponse();
        } catch (ForbiddenRespondException $e) {
            $debugInfo = [
                'error' => $e->getMessage(),
                'file'  => $e->getFile(),
                'line'  => $e->getLine(),
            ];

            return (new ParentResponse(
                error: new Error(code: $e->getCode(), message: $e->getMessage()),
                httpStatus: 403,
                status: StatusEnum::FAIL,
                debugInfo: $debugInfo,
            ))->toResponse();
        } catch (RespondNotFoundException $e) {
            $debugInfo = [
                'error' => $e->getMessage(),
                'file'  => $e->getFile(),
                'line'  => $e->getLine(),
            ];

            return (new ParentResponse(
                error: new Error(code: $e->getCode(), message: $e->getMessage()),
                httpStatus: 404,
                status: StatusEnum::FAIL,
            ))->toResponse();
        } catch (Throwable $e) {
            $debugInfo = [
                'error' => $e->getMessage(),
                'file'  => $e->getFile(),
                'line'  => $e->getLine(),
            ];

            return (new ParentResponse(
                error: new Error(code: $e->getCode(), message: $e->getMessage()),
                httpStatus: 500,
                status: StatusEnum::FAIL,
            ))->toResponse();
        }
    }

    public function updateStatus(int $respondId, Request $request): JsonResponse {
        $user   = $request->user();
        $status = $request->input('status');
        try {
            $this->respondAndInteractionAction->updateRespondStatus($user, $respondId, $status);

            return (new ParentResponse(
                data: ['respond_id' => $respondId],
                httpStatus: 204,
                status: StatusEnum::OK,
            ))->toResponse();
        } catch (ForbiddenRespondException $e) {
            $debugInfo = [
                'error' => $e->getMessage(),
                'file'  => $e->getFile(),
                'line'  => $e->getLine(),
            ];

            return (new ParentResponse(
                error: new Error(code: $e->getCode(), message: $e->getMessage()),
                httpStatus: 403,
                status: StatusEnum::FAIL,
                debugInfo: $debugInfo,
            ))->toResponse();
        } catch (RespondNotFoundException $e) {
            $debugInfo = [
                'error' => $e->getMessage(),
                'file'  => $e->getFile(),
                'line'  => $e->getLine(),
            ];

            return (new ParentResponse(
                error: new Error(code: $e->getCode(), message: $e->getMessage()),
                httpStatus: 404,
                status: StatusEnum::FAIL,
                debugInfo: $debugInfo,
            ))->toResponse();
        } catch (Throwable $e) {
            $debugInfo = [
                'error' => $e->getMessage(),
                'file'  => $e->getFile(),
                'line'  => $e->getLine(),
            ];

            return (new ParentResponse(
                error: new Error(code: $e->getCode(), message: $e->getMessage()),
                httpStatus: 500,
                status: StatusEnum::FAIL,
                debugInfo: $debugInfo,
            ))->toResponse();
        }
    }

    public function bestMatches(int $vacancyId, Request $request): JsonResponse {
        $user = $request->user();
        try {
            // Проверяем, что пользователь является владельцем вакансии
            $vacancy = \App\Models\Vacancies::find($vacancyId);

            if (!$vacancy || $vacancy->user_id !== $user->id) {
                throw new ForbiddenRespondException();
            }

            $bestMatches = $this->respondAndInteractionAction->bestMatchResumesByVacancyWithSmart($vacancyId);

            return (new ParentResponse(
                data: $bestMatches,
                httpStatus: 200,
                status: StatusEnum::OK,
            ))->toResponse();
        } catch (ForbiddenRespondException $e) {
            $debugInfo = [
                'error' => $e->getMessage(),
                'file'  => $e->getFile(),
                'line'  => $e->getLine(),
            ];

            return (new ParentResponse(
                error: new Error(code: $e->getCode(), message: $e->getMessage()),
                httpStatus: 403,
                status: StatusEnum::FAIL,
                debugInfo: $debugInfo,
            ))->toResponse();
        } catch (NotFoundCompanyException $e) {
            $debugInfo = [
                'error' => $e->getMessage(),
                'file'  => $e->getFile(),
                'line'  => $e->getLine(),
            ];

            return (new ParentResponse(
                error: new Error(code: $e->getCode(), message: $e->getMessage()),
                httpStatus: 404,
                status: StatusEnum::FAIL,
                debugInfo: $debugInfo,
            ))->toResponse();
        } catch (RespondNotFoundException $e) {
            $debugInfo = [
                'error' => $e->getMessage(),
                'file'  => $e->getFile(),
                'line'  => $e->getLine(),
            ];

            return (new ParentResponse(
                error: new Error(code: $e->getCode(), message: $e->getMessage()),
                httpStatus: 404,
                status: StatusEnum::FAIL,
                debugInfo: $debugInfo,
            ))->toResponse();
        } catch (Throwable $e) {
            $debugInfo = [
                'error' => $e->getMessage(),
                'file'  => $e->getFile(),
                'line'  => $e->getLine(),
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
