<?php

namespace App\Domain\Resume\Presentation\Requests;

use App\Domain\SharedKernel\Requests\ParentRequest;

class ResumeUpdateRequest extends ParentRequest
{
    public function rules(): array
    {
        return [
            // Основные поля резюме
            'date_of_birth' => 'nullable|date|before:today',
            'city' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'about' => 'nullable|string',
            'profession_id' => 'nullable|exists:professions,id',
            'education' => 'nullable|string|max:255',
            'salary' => 'nullable|integer|min:0',
            'status' => 'nullable|boolean',

            // Навыки
            'skills' => 'nullable|array',
            'skills.*' => 'exists:skills,id',

            // Образование
            'educations' => 'nullable|array',
            'educations.*.institution_name' => 'required|string|max:255',
            'educations.*.degree' => 'nullable|string|max:255',
            'educations.*.specialization' => 'nullable|string|max:255',
            'educations.*.start_date' => 'nullable|date',
            'educations.*.end_date' => 'nullable|date',

            // Опыт работы
            'experiences' => 'nullable|array',
            'experiences.*.company_name' => 'required|string|max:255',
            'experiences.*.position' => 'required|string|max:255',
            'experiences.*.start_date' => 'required|date',
            'experiences.*.end_date' => 'nullable|date',
            'experiences.*.description' => 'nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            // Основные поля резюме
            'id.required' => 'ID резюме обязателен',
            'id.exists' => 'Резюме с указанным ID не существует',
            'date_of_birth.required' => 'Дата рождения обязательна',
            'date_of_birth.date' => 'Дата рождения должна быть корректной датой',
            'date_of_birth.before' => 'Дата рождения должна быть раньше сегодняшнего дня',
            'city.required' => 'Город обязателен',
            'city.string' => 'Город должен быть строкой',
            'city.max' => 'Название города не должно превышать 255 символов',
            'country.required' => 'Страна обязательна',
            'country.string' => 'Страна должна быть строкой',
            'country.max' => 'Название страны не должно превышать 255 символов',
            'phone.required' => 'Номер телефона обязателен',
            'phone.string' => 'Номер телефона должен быть строкой',
            'phone.max' => 'Номер телефона не должен превышать 20 символов',
            'about.required' => 'Информация о себе обязательна',
            'about.string' => 'Информация о себе должна быть строкой',
            'profession_id.required' => 'ID профессии обязателен',
            'profession_id.exists' => 'Профессия с указанным ID не существует',
            'education.required' => 'Образование обязательно',
            'education.string' => 'Образование должно быть строкой',
            'education.max' => 'Образование не должно превышать 255 символов',
            'salary.nullable' => 'Зарплата необязательна',
            'salary.integer' => 'Зарплата должна быть целым числом',
            'salary.min' => 'Зарплата не может быть отрицательной',
            'status.nullable' => 'Статус необязателен',
            'status.boolean' => 'Статус должен быть булевым значением',
            
            // Навыки
            'skills.nullable' => 'Навыки необязательны',
            'skills.array' => 'Навыки должны быть массивом',
            'skills.*.exists' => 'Указанный навык не существует',
            
            // Образование
            'educations.nullable' => 'Образование необязательно',
            'educations.array' => 'Образование должно быть массивом',
            'educations.*.institution_name.required' => 'Название учебного заведения обязательно',
            'educations.*.institution_name.string' => 'Название учебного заведения должно быть строкой',
            'educations.*.institution_name.max' => 'Название учебного заведения не должно превышать 255 символов',
            'educations.*.degree.nullable' => 'Степень образования необязательна',
            'educations.*.degree.string' => 'Степень образования должна быть строкой',
            'educations.*.degree.max' => 'Степень образования не должна превышать 255 символов',
            'educations.*.specialization.nullable' => 'Специализация необязательна',
            'educations.*.specialization.string' => 'Специализация должна быть строкой',
            'educations.*.specialization.max' => 'Специализация не должна превышать 255 символов',
            'educations.*.start_date.nullable' => 'Дата начала обучения необязательна',
            'educations.*.start_date.date' => 'Дата начала обучения должна быть корректной датой',
            'educations.*.end_date.nullable' => 'Дата окончания обучения необязательна',
            'educations.*.end_date.date' => 'Дата окончания обучения должна быть корректной датой',
            
            // Опыт работы
            'experiences.nullable' => 'Опыт работы необязателен',
            'experiences.array' => 'Опыт работы должен быть массивом',
            'experiences.*.company_name.required' => 'Название компании обязательно',
            'experiences.*.company_name.string' => 'Название компании должно быть строкой',
            'experiences.*.company_name.max' => 'Название компании не должно превышать 255 символов',
            'experiences.*.position.required' => 'Должность обязательна',
            'experiences.*.position.string' => 'Должность должна быть строкой',
            'experiences.*.position.max' => 'Название должности не должно превышать 255 символов',
            'experiences.*.start_date.required' => 'Дата начала работы обязательна',
            'experiences.*.start_date.date' => 'Дата начала работы должна быть корректной датой',
            'experiences.*.end_date.nullable' => 'Дата окончания работы необязательна',
            'experiences.*.end_date.date' => 'Дата окончания работы должна быть корректной датой',
            'experiences.*.description.nullable' => 'Описание работы необязательно',
            'experiences.*.description.string' => 'Описание работы должно быть строкой',
        ];
    }
}