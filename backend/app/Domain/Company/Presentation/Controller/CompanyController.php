<?php
declare(strict_types=1);

namespace App\Domain\Company\Presentation\Controller;

use App\Domain\Company\Application\Action\CompanyAction;
use App\Domain\Company\Presentation\Requests\CompanyStoreRequest;
use App\Domain\SharedKernel\Responses\Error;
use App\Domain\SharedKernel\Responses\ParentResponse;
use App\Domain\SharedKernel\Responses\StatusEnum;
use App\Http\Controllers\Controller;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;

class CompanyController extends Controller
{
    private CompanyAction $companyAction;

    public function __construct() {
        $this->companyAction = new CompanyAction();
    }

    public function store(CompanyStoreRequest $request): JsonResponse
    {
        $user = $request->user();
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Пользователь не авторизован'
            ], 401);
        }

        try {
            $companyId = $this->companyAction->createCompany($user, $request->validated());

            return (new ParentResponse(
                data: ['company_id' => $companyId],
                httpStatus: 200,
                status: StatusEnum::OK,
            ))->toResponse();
        } catch (QueryException $e) {
            $debugInfo = [
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ];
            return (new ParentResponse(
                error: new Error(code: $e->getCode(), message: "Ошибка при создании компании"),
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
}