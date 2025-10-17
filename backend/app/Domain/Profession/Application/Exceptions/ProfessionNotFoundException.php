<?php
declare(strict_types=1);

namespace App\Domain\Profession\Application\Exceptions;

use Exception;
use Throwable;

class ProfessionNotFoundException extends Exception
{
    public function __construct(string $message = 'Профессия не найдена', int $code = 404, Throwable $previous = null) {
        parent::__construct($message, $code, $previous);
    }
}
