<?php
declare(strict_types=1);

namespace App\Domain\Vacancy\Application\Exceptions;

use Exception;
use Throwable;

class VacancyNotFoundException extends Exception
{
    public function __construct(string $message = 'Vacancy not found', int $code = 404, Throwable $previous = null) {
        parent::__construct($message, $code, $previous);
    }
}
