<?php
declare(strict_types=1);

namespace App\Domain\Connection\Application\Exceptions;

use Exception;
use Throwable;

class ChatNotFoundException extends Exception
{
    public function __construct(string $message = 'Чат не найден', int $code = 404, Throwable $previous = null) {
        parent::__construct($message, $code, $previous);
    }
}
