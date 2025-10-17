<?php
declare(strict_types=1);

namespace App\Domain\Company\Application\Exceptions;

use Exception;
use Throwable;

class NotFoundCompanyException extends Exception
{
    public function __construct(string $message = 'Компания не найдена', int $code = 0, Throwable $previous = null) {
        parent::__construct($message, $code, $previous);
    }
}