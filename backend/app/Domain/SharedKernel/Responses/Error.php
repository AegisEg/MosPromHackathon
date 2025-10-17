<?php
declare(strict_types=1);

namespace App\Domain\SharedKernel\Responses;

use Illuminate\Contracts\Support\Arrayable;

/**
 * DTO ошибка на фронт
 */
readonly class Error implements Arrayable
{
    public function __construct(public string|int $code, public string $message) {}

    /**
     * @return array<TKey, TValue>
     */
    public function toArray(): array {
        return [
            'code'    => $this->code,
            'message' => $this->message,
        ];
    }
}
