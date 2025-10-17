<?php
declare(strict_types=1);

namespace App\Domain\Vacancy\Presentation\Requests;

use App\Domain\SharedKernel\Requests\ParentRequest;
use App\Enums\EmploymentType;
use App\Enums\ExperienceLevel;

class UpdateVacancyRequest extends ParentRequest
{
    public function rules(): array {
        $experienceLevels = implode(',', array_column(ExperienceLevel::cases(), 'value'));
        $employmentTypes  = implode(',', array_column(EmploymentType::cases(), 'value'));

        return [
            'title'           => 'nullable|string|max:255',
            'description'     => 'nullable|string|min:10',
            'company_id'      => 'nullable|exists:companies,id',
            'profession_id'   => 'nullable|exists:professions,id',
            'employment_type' => "nullable|integer|in:{$employmentTypes}",
            'experience_wide' => "nullable|integer|in:{$experienceLevels}",
            'salary_from'     => 'nullable|integer|min:0',
            'salary_to'       => 'nullable|integer|min:0',
            'status'          => 'nullable|boolean',
            'skills'          => 'nullable|array',
            'skills.*'        => 'exists:skills,id',
        ];
    }

    public function messages(): array {
        return [
            'title.string'            => 'Заголовок должен быть строкой',
            'title.max'               => 'Заголовок не должен превышать 255 символов',
            'description.string'      => 'Описание должно быть строкой',
            'description.min'         => 'Описание должно быть не менее 10 символов',
            'company_id.exists'       => 'Компания с указанным ID не существует',
            'profession_id.exists'    => 'Профессия с указанным ID не существует',
            'employment_type.exists'  => 'Тип занятости с указанным ID не существует',
            'experience_wide.integer' => 'Опыт работы должен быть числом',
            'experience_wide.in'      => 'Указан недопустимый уровень опыта.',
            'salary_from.integer'     => 'Зарплата от должна быть целым числом',
            'salary_from.min'         => 'Зарплата от не может быть отрицательной',
            'salary_to.integer'       => 'Зарплата до должна быть целым числом',
            'salary_to.min'           => 'Зарплата до не может быть отрицательной',
            'status.boolean'          => 'Статус должен быть булевым значением',
            'skills.array'            => 'Навыки должны быть массивом',
            'skills.*.exists'         => 'Указанный навык не существует',
        ];
    }
}
