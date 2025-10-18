<?php

namespace App\Domain\Resume\Presentation\Controllers;

use App\Domain\Resume\Application\Action\ResumeAction;
use App\Domain\Resume\Application\Exception\ForbiddenResumeException;
use App\Domain\Resume\Application\Exception\NotFoundResumeException;
use App\Domain\Resume\Presentation\Requests\ResumeRequest;
use App\Domain\Resume\Presentation\Requests\ResumeUpdateRequest;
use App\Domain\SharedKernel\Responses\Error;
use App\Domain\SharedKernel\Responses\ParentResponse;
use App\Domain\SharedKernel\Responses\StatusEnum;
use App\Http\Controllers\Controller;
use App\Models\Resume;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ResumeController extends Controller
{
    private ResumeAction $resumeAction;

    public function __construct() {
        $this->resumeAction = new ResumeAction();
    }

    /**
     * Создать новое резюме
     */
    public function store(ResumeRequest $request): JsonResponse
    {
        // Получаем авторизованного пользователя из токена
        $user = $request->user();
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Пользователь не авторизован'
            ], 401);
        }

        try {
            $resumeId = $this->resumeAction->createResume($user, $request->validated());

            return (new ParentResponse(
                data: ['resume_id' => $resumeId],
                httpStatus: 201,
                status: StatusEnum::OK,
            ))->toResponse();
        } catch (QueryException $e) {
            $debugInfo = [
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ];
            return (new ParentResponse(
                error: new Error(code: $e->getCode(), message: "Ошибка при создании резюме"),
                httpStatus: 400,
                debugInfo: $debugInfo,
                status: StatusEnum::FAIL,
            ))->toResponse();
        } catch (\Throwable $e) {
            $debugInfo = [
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ];
            return (new ParentResponse(
                error: new Error(code: $e->getCode(), message: 'Непредвиденная ошибка при создании резюме'),
                httpStatus: 500,
                debugInfo: $debugInfo,
                status: StatusEnum::FAIL,
            ))->toResponse();
        }
    }

    public function favorite(int $vacancyId, Request $request): JsonResponse {
        try {
            $user = $request->user();
            $this->resumeAction->favoriteResumeByVacancy($user, $vacancyId);
            return (new ParentResponse(
                httpStatus: 200,
                status: StatusEnum::OK,
            ))->toResponse();
        } catch (NotFoundResumeException $e) {
            $debugInfo = [
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ];
            return (new ParentResponse(
                error: new Error(code: $e->getCode(), message: 'Резюме не найдено'),
                httpStatus: 404,

                debugInfo: $debugInfo,
                status: StatusEnum::FAIL,
            ))->toResponse();
        } catch (\Throwable $e) {
            $debugInfo = [
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ];
            return (new ParentResponse(
                error: new Error(code: $e->getCode(), message: 'Непредвиденная ошибка при получении резюме'),
                httpStatus: 500,
                debugInfo: $debugInfo,
                status: StatusEnum::FAIL,
            ))->toResponse();
        }
    }
    /**
     * Получить конкретное резюме
     */
    public function show(int $id): JsonResponse
    {
        try {
            $resume = $this->resumeAction->getResume($id);

            return (new ParentResponse(
                data: $resume,
                httpStatus: 200,
                status: StatusEnum::OK,
            ))->toResponse();
        } catch (NotFoundResumeException $e) {
            $debugInfo = [
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ];
            return (new ParentResponse(
                error: new Error(code: $e->getCode(), message: 'Резюме не найдено'),
                httpStatus: 404,
                debugInfo: $debugInfo,
                status: StatusEnum::FAIL,
            ))->toResponse();
        } catch (\Throwable $e) {
            $debugInfo = [
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ];
            return (new ParentResponse(
                error: new Error(code: $e->getCode(), message: 'Непредвиденная ошибка при получении резюме'),
                httpStatus: 500,
                debugInfo: $debugInfo,
                status: StatusEnum::FAIL,
            ))->toResponse();
        }

    }

    /**
     * Обновить резюме
     */
    public function update(int $id, ResumeUpdateRequest $request): JsonResponse {
        try {
            $user = $request->user();
            // Обновляем навыки, если они переданы
            $resumeId = $this->resumeAction->updateResume($user, $id, $request->validated());
            return (new ParentResponse(
                data: ['resume_id' => $resumeId],
                httpStatus: 200,
                status: StatusEnum::OK,
            ))->toResponse();
        } catch (NotFoundResumeException $e) {
            $debugInfo = [
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ];
            return (new ParentResponse(
                error: new Error(code: $e->getCode(), message: 'Резюме не найдено'),
                httpStatus: 404,
                debugInfo: $debugInfo,
                status: StatusEnum::FAIL,
            ))->toResponse();
        } catch (ForbiddenResumeException $e) {
            $debugInfo = [
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ];
            return (new ParentResponse(
                error: new Error(code: $e->getCode(), message: 'Действие запрещено для этого пользователя'),
                httpStatus: 403,
                debugInfo: $debugInfo,
                status: StatusEnum::FAIL,
            ))->toResponse();
        } catch (\Throwable $e) {
            $debugInfo = [
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ];
            return (new ParentResponse(
                error: new Error(code: $e->getCode(), message: 'Непредвиденная ошибка при обновлении резюме'),
                httpStatus: 500,
                debugInfo: $debugInfo,
                status: StatusEnum::FAIL,
            ))->toResponse();
        }
    }

    /**
     * Удалить резюме
     */
    public function destroy(int $id, Request $request): JsonResponse {
        try {
            $user = $request->user();
            $this->resumeAction->deleteResume($user, $id);
            return (new ParentResponse(
                httpStatus: 204,
                status: StatusEnum::OK,
            ))->toResponse();
        } catch (NotFoundResumeException $e) {
            $debugInfo = [
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ];
            return (new ParentResponse(
                error: new Error(code: $e->getCode(), message: 'Резюме не найдено'),
                httpStatus: 404,
                debugInfo: $debugInfo,
                status: StatusEnum::FAIL,
            ))->toResponse();
        } catch (ForbiddenResumeException $e) {
            $debugInfo = [
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ];
            return (new ParentResponse(
                error: new Error(code: $e->getCode(), message: 'Действие запрещено для этого пользователя'),
                httpStatus: 403,
                debugInfo: $debugInfo,
                status: StatusEnum::FAIL,
            ))->toResponse();
        } catch (\Throwable $e) {
            $debugInfo = [
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ];
            return (new ParentResponse(
                error: new Error(code: $e->getCode(), message: 'Непредвиденная ошибка при удалении резюме'),
                httpStatus: 500,
                debugInfo: $debugInfo,
                status: StatusEnum::FAIL,
            ))->toResponse();
        }
    }
}
