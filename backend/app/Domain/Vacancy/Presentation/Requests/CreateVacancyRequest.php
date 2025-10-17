<?php
declare(strict_types=1);

namespace App\Domain\Vacancy\Presentation\Requests;

use App\Domain\SharedKernel\Requests\ParentRequest;
use App\Enums\EmploymentType;
use App\Enums\ExperienceLevel;

class CreateVacancyRequest extends ParentRequest
{
    public function rules(): array {
        $experienceLevels = implode(',', array_column(ExperienceLevel::cases(), 'value'));
        $employmentTypes  = implode(',', array_column(EmploymentType::cases(), 'value'));

        return [
            'title'           => 'required|string|max:255',
            'description'     => 'required|string|min:10',
            'company_id'      => 'required|exists:companies,id',
            'profession_id'   => 'required|exists:professions,id',
            'employment_type' => "required|integer|in:{$employmentTypes}",
            'experience_wide' => "required|integer|in:{$experienceLevels}",
            'salary_from'     => 'required|integer|min:0',
            'salary_to'       => 'required|integer|min:0',
            'status'          => 'required|boolean',
            'skills'          => 'required|array',
            'skills.*'        => 'exists:skills,id',
        ];
    }

    public function messages(): array {
        return [
            'title.required'           => 'Заголовок обязателен',
            'title.string'             => 'Заголовок должен быть строкой',
            'title.max'                => 'Заголовок не должен превышать 255 символов',
            'description.required'     => 'Описание обязательно',
            'description.string'       => 'Описание должно быть строкой',
            'description.min'          => 'Описание должно быть не менее 10 символов',
            'company_id.required'      => 'ID компании обязателен',
            'company_id.exists'        => 'Компания с указанным ID не существует',
            'profession_id.required'   => 'ID профессии обязателен',
            'profession_id.exists'     => 'Профессия с указанным ID не существует',
            'employment_type.required' => 'Тип занятости обязателен',
            'employment_type.exists'   => 'Тип занятости с указанным ID не существует',
            'experience_wide.required' => 'Опыт работы обязателен',
            'experience_wide.integer'  => 'Опыт работы должен быть числом',
            'experience_wide.in'       => 'Указан недопустимый уровень опыта.',
            'salary_from.required'     => 'Зарплата от обязательна',
            'salary_from.integer'      => 'Зарплата от должна быть целым числом',
            'salary_from.min'          => 'Зарплата от не может быть отрицательной',
            'salary_to.required'       => 'Зарплата до обязательна',
            'salary_to.integer'        => 'Зарплата до должна быть целым числом',
            'salary_to.min'            => 'Зарплата до не может быть отрицательной',
            'status.required'          => 'Статус обязателен',
            'status.boolean'           => 'Статус должен быть булевым значением',
            'skills.required'          => 'Навыки обязательны',
            'skills.array'             => 'Навыки должны быть массивом',
            'skills.*.exists'          => 'Указанный навык не существует',
        ];
    }
}
