<?php
declare(strict_types=1);

namespace App\Domain\SharedKernel\Responses;

use App\Domain\SharedKernel\Responses\StatusEnum;
use App\Domain\SharedKernel\Responses\Error;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ParentResponse implements Responsable
{
    public function __construct(
        public readonly array $data = [],
        public readonly StatusEnum $status = StatusEnum::OK,
        public readonly ?Error $error = null,
        public readonly int $httpStatus = 200,
        public readonly array $debugInfo = [],
    ) {}

    /**
    * @param  Request $request
    * @return JsonResponse
    */
    public function toResponse($request = null) {
        $response = [
            'status' => $this->status->value,
        ];

        if (!empty($this->data)) {
            $response['data'] = $this->data;
        }

        if (!empty($this->error)) {
            $response['error'] = $this->error->toArray();
        }

        if (!empty($this->debugInfo) && config('app.debug')) {
            $response['debugInfo'] = $this->debugInfo;
        }

        return new JsonResponse(
            data: $response,
            status: $this->httpStatus,
        );
    }
}
