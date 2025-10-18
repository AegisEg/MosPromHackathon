<?php
declare(strict_types=1);

namespace App\Domain\Connection\Application\Exceptions;

use Exception;
use Throwable;

class ForbiddenChatException extends Exception
{
    public function __construct(string $message = 'Действие запрещено для этого пользователя', int $code = 403, Throwable $previous = null) {
        parent::__construct($message, $code, $previous);
    }
}
