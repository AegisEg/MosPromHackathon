<?php

declare(strict_types=1);

namespace App\Domain\Profession\Presentation\Controllers;

use App\Domain\Profession\Application\Action\ProfessionAction;
use App\Domain\Profession\Application\Exceptions\ProfessionNotFoundException;
use App\Domain\SharedKernel\Responses\Error;
use App\Domain\SharedKernel\Responses\ParentResponse;
use App\Domain\SharedKernel\Responses\StatusEnum;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Throwable;

class ProfessionController extends Controller
{
    public function index(): JsonResponse {
        $professionDTOs = (new ProfessionAction())->professionList();
        $professions    = [];

        foreach ($professionDTOs as $professionDTO) {
            $professions[] = $professionDTO->toArray();
        }

        return (new ParentResponse(
            data: $professions,
            httpStatus: 200,
            status: StatusEnum::OK,
        ))->toResponse();
    }

    public function show(int $id): JsonResponse {
        try {
            $profession = (new ProfessionAction())->showProfestion($id);

            return (new ParentResponse(
                data: $profession->toArray(),
                httpStatus: 200,
                status: StatusEnum::OK,
            ))->toResponse();
        } catch (ProfessionNotFoundException $e) {
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

    public function skills(int $id): JsonResponse {
        try {
            $skillsDTOs = (new ProfessionAction())->professionSkills($id);
            $skills     = [];

            foreach ($skillsDTOs as $skillDTO) {
                $skills[] = $skillDTO->toArray();
            }

            return (new ParentResponse(
                data: $skills,
                httpStatus: 200,
                status: StatusEnum::OK,
            ))->toResponse();
        } catch (ProfessionNotFoundException $e) {
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
