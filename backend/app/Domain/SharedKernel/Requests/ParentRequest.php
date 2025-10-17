<?php
declare(strict_types=1);

namespace App\Domain\SharedKernel\Requests;

use App\Domain\SharedKernel\Responses\Error;
use App\Domain\SharedKernel\Responses\ParentResponse;
use App\Domain\SharedKernel\Responses\StatusEnum;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class ParentRequest extends FormRequest
{
    /**
     * Парсинг ошибок из валидатора
     */
    private function parseErrorsArray(Validator $validator): array {
        $validateError = $validator->errors()->messages();
        $errors        = [];

        foreach ($validateError as $key => $error) {
            $errors[] = [
                'code'    => $key,
                'message' => $error[0],
            ];
        }

        return $errors ;
    }

    protected function failedValidation(Validator $validator): never {
        $error    = $this->parseErrorsArray($validator)[0];
        $response = new ParentResponse(data: [], status: StatusEnum::FAIL, error: new Error($error['code'], $error['message']), httpStatus: 422);
        throw new HttpResponseException($response->toResponse());
    }
}
