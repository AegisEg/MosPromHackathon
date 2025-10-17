<?php
declare(strict_types=1);

namespace App\Domain\Internship\Presentation\Requests;

use App\Domain\SharedKernel\Requests\ParentRequest;

class CreateInternshipRequest extends ParentRequest
{
    public function rules(): array {
        return [
            'speciality'        => 'required|string|max:255',
            'count_students'    => 'required|integer|min:1',
            'start_date_period' => 'required|date_format:Y-m-d\TH:i:sP',
            'end_date_period'   => 'required|date_format:Y-m-d\TH:i:sP|after:start_date_period',
        ];
    }

    public function messages(): array {
        return [
            'speciality.required'           => 'Специальность обязательна',
            'speciality.string'             => 'Специальность должна быть строкой',
            'speciality.max'                => 'Специальность не должна превышать 255 символов',
            'count_students.required'       => 'Количество студентов обязательно',
            'count_students.integer'        => 'Количество студентов должно быть целым числом',
            'count_students.min'            => 'Количество студентов должно быть не менее 1',
            'start_date_period.required'    => 'Дата начала периода обязательна',
            'start_date_period.date_format' => 'Дата начала периода должна быть в формате ISO 8601 (например: 2025-11-01T00:00:00+03:00)',
            'end_date_period.required'      => 'Дата окончания периода обязательна',
            'end_date_period.date_format'   => 'Дата окончания периода должна быть в формате ISO 8601 (например: 2025-12-31T23:59:59+03:00)',
            'end_date_period.after'         => 'Дата окончания должна быть после даты начала',
        ];
    }
}
