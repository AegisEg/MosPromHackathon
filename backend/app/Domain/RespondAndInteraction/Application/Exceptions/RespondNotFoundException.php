<?php
declare(strict_types=1);

namespace App\Domain\RespondAndInteraction\Application\Exceptions;

use Exception;
use Throwable;

class RespondNotFoundException extends Exception
{
    public function __construct(string $message = 'Отклик не найден', int $code = 404, Throwable $previous = null) {
        parent::__construct($message, $code, $previous);
    }
}