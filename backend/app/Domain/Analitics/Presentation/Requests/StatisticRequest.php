<?php
declare(strict_types=1);

namespace App\Domain\Analitics\Presentation\Requests;

use App\Domain\SharedKernel\Requests\ParentRequest;

class StatisticRequest extends ParentRequest
{
    public function rules(): array {
        return [
            'limit'        => 'nullable|integer|min:1',
            'professionId' => 'nullable|integer|exists:professions,id',
            'startDate'    => 'nullable|date_format:Y-m-d\TH:i:sP',
            'endDate'      => 'nullable|date_format:Y-m-d\TH:i:sP|after:startDate',
        ];
    }

    public function messages(): array {
        return [
            'professionId.exists'   => 'Профессия с указанным ID не существует',
            'professionId.integer'  => 'ID профессии должен быть целым числом',
            'limit.integer'         => 'Лимит должен быть целым числом',
            'limit.min'             => 'Лимит должен быть не менее 1',
            'startDate.date_format' => 'Дата начала должна быть в формате ISO 8601',
            'endDate.date_format'   => 'Дата окончания должна быть в формате ISO 8601',
            'endDate.after'         => 'Дата окончания должна быть после даты начала',
        ];
    }
}
