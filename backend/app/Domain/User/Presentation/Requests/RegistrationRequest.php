<?php
declare(strict_types=1);

namespace App\Domain\User\Presentation\Requests;

use App\Domain\SharedKernel\Requests\ParentRequest;
use App\Enums\UserRole;

class RegistrationRequest extends ParentRequest
{
    public function rules(): array {
        $roles = implode(',', array_column(UserRole::cases(), 'value'));

        return [
            'first_name'  => 'required|string|max:255',
            'last_name'   => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'email'       => 'required|email|unique:users,email',
            'password'    => 'required|string|min:8',
            'role'        => 'required|integer|in:' .$roles,
        ];
    }

    public function messages(): array {
        return [
            'first_name.required'  => 'Имя обязательно',
            'first_name.string'    => 'Имя должно быть строкой',
            'first_name.max'       => 'Имя не должно превышать 255 символов',
            'last_name.required'   => 'Фамилия обязательна',
            'last_name.string'     => 'Фамилия должна быть строкой',
            'last_name.max'        => 'Фамилия не должна превышать 255 символов',
            'middle_name.nullable' => 'Отчество необязательно',
            'middle_name.string'   => 'Отчество должно быть строкой',
            'middle_name.max'      => 'Отчество не должно превышать 255 символов',
            'email.required'       => 'Email обязателен',
            'email.email'          => 'Email должен быть email',
            'email.unique'         => 'Email должен быть уникальным',
            'password.required'    => 'Пароль обязателен',
            'password.string'      => 'Пароль должен быть строкой',
            'password.min'         => 'Пароль должен быть не менее 8 символов',
            'role.required'        => 'Роль обязательна',
            'role.integer'         => 'Роль должна быть числом',
            'role.in'              => 'Указан недопустимый тип роли.',
        ];
    }
}
