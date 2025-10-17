<?php
declare(strict_types=1);

namespace App\Domain\Internship\Application\Exceptions;

use Exception;
use Throwable;

class ForbiddenInternshipException extends Exception
{
    public function __construct(string $message = 'Действие запрещено', int $code = 403, Throwable $previous = null) {
        parent::__construct($message, $code, $previous);
    }
}
