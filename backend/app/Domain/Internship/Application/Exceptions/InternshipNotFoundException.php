<?php
declare(strict_types=1);

namespace App\Domain\Internship\Application\Exceptions;

use Exception;
use Throwable;

class InternshipNotFoundException extends Exception
{
    public function __construct(string $message = 'Стажировка не найдена', int $code = 404, Throwable $previous = null) {
        parent::__construct($message, $code, $previous);
    }
}
