<?php

namespace App\Domain\Resume\Presentation\Controllers;

use App\Domain\Resume\Application\Action\ResumeAction;
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
     * Получить список всех резюме
     */
    // public function index(Request $request): JsonResponse
    // {
    //     $query = Resume::with(['user', 'profession', 'skills', 'experiences', 'educations']);

    //     // Фильтрация по профессии
    //     if ($request->has('profession_id')) {
    //         $query->where('profession_id', $request->profession_id);
    //     }

    //     // Фильтрация по статусу
    //     if ($request->has('status')) {
    //         $query->where('status', $request->status);
    //     }

    //     // Фильтрация по городу
    //     if ($request->has('city')) {
    //         $query->where('city', 'like', '%' . $request->city . '%');
    //     }

    //     // Фильтрация по зарплате
    //     if ($request->has('salary_from')) {
    //         $query->where('salary', '>=', $request->salary_from);
    //     }

    //     if ($request->has('salary_to')) {
    //         $query->where('salary', '<=', $request->salary_to);
    //     }

    //     // Пагинация
    //     $perPage = $request->get('per_page', 15);
    //     $resumes = $query->paginate($perPage);

    //     return response()->json([
    //         'success' => true,
    //         'data' => $resumes
    //     ]);
    // }

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
            // Обновляем навыки, если они переданы
            $resumeId = $this->resumeAction->updateResume($id, $request->validated());
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
    public function destroy(int $id): JsonResponse {
        try {
            $this->resumeAction->deleteResume($id);
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
                httpStatus: 500,
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

    /**
     * Поиск резюме по навыкам
     */
    public function searchBySkills(Request $request): JsonResponse
    {
        $request->validate([
            'skills' => 'required|array',
            'skills.*' => 'exists:skills,id'
        ]);

        $skillIds = $request->skills;

        $resumes = Resume::with(['user', 'profession', 'skills', 'experiences', 'educations'])
            ->whereHas('skills', function ($query) use ($skillIds) {
                $query->whereIn('skills.id', $skillIds);
            })
            ->get();

        return response()->json([
            'success' => true,
            'data' => $resumes
        ]);
    }

    /**
     * Получить статистику по резюме
     */
    public function getStatistics(): JsonResponse
    {
        $statistics = [
            'total_resumes' => Resume::count(),
            'active_resumes' => Resume::where('status', 'active')->count(),
            'inactive_resumes' => Resume::where('status', 'inactive')->count(),
            'draft_resumes' => Resume::where('status', 'draft')->count(),
            'resumes_by_profession' => Resume::with('profession')
                ->selectRaw('profession_id, count(*) as count')
                ->groupBy('profession_id')
                ->get()
                ->map(function ($item) {
                    return [
                        'profession' => $item->profession->name ?? 'Не указано',
                        'count' => $item->count
                    ];
                }),
            'resumes_by_city' => Resume::selectRaw('city, count(*) as count')
                ->groupBy('city')
                ->orderBy('count', 'desc')
                ->limit(10)
                ->get(),
            'average_salary' => Resume::whereNotNull('salary')->avg('salary'),
            'salary_range' => [
                'min' => Resume::whereNotNull('salary')->min('salary'),
                'max' => Resume::whereNotNull('salary')->max('salary')
            ]
        ];

        return response()->json([
            'success' => true,
            'data' => $statistics
        ]);
    }
}
