<?php
declare(strict_types=1);

namespace App\Domain\Company\Presentation\Requests;

use App\Domain\SharedKernel\Requests\ParentRequest;

class CompanyStoreRequest extends ParentRequest
{
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255|unique:companies,name',
            'description' => 'nullable|string',
            'website' => 'nullable|url',
            'size' => 'nullable|integer|min:1',
            'city' => 'nullable|string',
            'country' => 'nullable|string',
            'logo_url' => 'nullable|url',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Название компании является обязательным',
            'name.unique' => 'Такое название компании уже существует',
            'name.string' => 'Название компании должно быть строкой',
            'name.max' => 'Название компании не должно превышать 255 символов',
            'description.nullable' => 'Описание компании необязательно',
            'description.string' => 'Описание компании должно быть строкой',
            'website.url' => 'Ссылка на сайт компании должна быть валидным URL',
            'size.nullable' => 'Размер компании необязательно',
            'size.string' => 'Размер компании должно быть строкой',
            'city.nullable' => 'Город компании необязательно',
            'city.string' => 'Город компании должно быть строкой',
            'country.string' => 'Страна компании должно быть строкой',
            'logo_url.url' => 'Ссылка на логотип компании должна быть валидным URL',
        ];
    }
}