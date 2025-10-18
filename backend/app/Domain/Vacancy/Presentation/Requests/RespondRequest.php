<?php
declare(strict_types=1);

namespace App\Domain\Vacancy\Presentation\Requests;

use App\Domain\SharedKernel\Requests\ParentRequest;

class RespondRequest extends ParentRequest
{
    public function rules(): array {
        return [
            'resume_id' => 'required|exists:resumes,id',
            'message'   => 'nullable|string|max:255',
        ];
    }

    public function messages(): array {
        return [
            'resume_id.required' => 'ID резюме обязателен',
            'resume_id.exists'   => 'Резюме с указанным ID не существует',
            'message.string'     => 'Сообщение должно быть строкой',
            'message.max'        => 'Сообщение не должно превышать 255 символов',
        ];
    }
}
