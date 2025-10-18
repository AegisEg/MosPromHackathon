<?php
declare(strict_types=1);

namespace App\Domain\Analitics\Presentation\Controllers;

use App\Http\Controllers\Controller;
use App\Domain\Analitics\Application\Action\ActionStatisticsResume;
use App\Domain\Analitics\Application\DTO\InputStatisticDTO;
use App\Domain\Analitics\Presentation\Requests\StatisticRequest;
use App\Domain\SharedKernel\Responses\ParentResponse;
use App\Domain\SharedKernel\Responses\StatusEnum;

class StatisticController extends Controller
{
    public function getTopProfessionsResume(StatisticRequest $request) {
        $limit     = (int) ($request->input('limit', 10));
        $startDate = $request->input('startDate');
        $endDate   = $request->input('endDate');

        if ($limit < 1) {
            $limit = 10;
        }

        $inputDto = new InputStatisticDTO(
            limit: $limit,
            startDate: $startDate,
            endDate: $endDate,
            professionId: null,
        );
        $dtos = (new ActionStatisticsResume())->topProfessionsResume($inputDto);

        return (new ParentResponse(
            data: array_map(static fn ($dto) => $dto->toArray(), $dtos),
            httpStatus: 200,
            status: StatusEnum::OK,
        ))->toResponse();
    }

    public function getTopSkillsResume(StatisticRequest $request) {
        $limit        = (int) request()->input('limit', 10);
        $startDate    = $request->input('startDate');
        $endDate      = $request->input('endDate');
        $professionId = request()->has('professionId') ? (int) request()->input('professionId') : null;

        if ($limit < 1) {
            $limit = 10;
        }

        $inputDto = new InputStatisticDTO(
            limit: $limit,
            startDate: $startDate,
            endDate: $endDate,
            professionId: $professionId,
        );
        $dtos = (new ActionStatisticsResume())->topSkillsResume($inputDto);

        return (new ParentResponse(
            data: array_map(static fn ($dto) => $dto->toArray(), $dtos),
            httpStatus: 200,
            status: StatusEnum::OK,
        ))->toResponse();
    }

    public function salariesResume(StatisticRequest $request) {
        $limit        = (int) request()->input('limit', 10);
        $startDate    = $request->input('startDate');
        $endDate      = $request->input('endDate');
        $professionId = request()->has('professionId') ? (int) request()->input('professionId') : null;

        if ($limit < 1) {
            $limit = 10;
        }

        $inputDto = new InputStatisticDTO(
            limit: $limit,
            startDate: $startDate,
            endDate: $endDate,
            professionId: $professionId,
        );
        $dto = (new ActionStatisticsResume())->averageMedianSalaryResume($inputDto);

        return (new ParentResponse(
            data: $dto->toArray(),
            httpStatus: 200,
            status: StatusEnum::OK,
        ))->toResponse();
    }

    public function experienceResume(StatisticRequest $request) {
        $startDate    = $request->input('startDate');
        $endDate      = $request->input('endDate');
        $professionId = request()->has('professionId') ? (int) request()->input('professionId') : null;

        $inputDto = new InputStatisticDTO(
            limit: 1,
            startDate: $startDate,
            endDate: $endDate,
            professionId: $professionId,
        );

        $dto = (new ActionStatisticsResume())->experienceResume($inputDto);

        return (new ParentResponse(
            data: $dto->toArray(),
            httpStatus: 200,
            status: StatusEnum::OK,
        ))->toResponse();
    }
}
