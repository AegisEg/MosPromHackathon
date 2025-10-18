<?php
declare(strict_types=1);

namespace App\Domain\Vacancy\Application\Exceptions;

use Exception;
use Throwable;

class AlreadyRespondedVacancyException extends Exception
{
    public function __construct(string $message = 'Вы уже откликнулись на эту вакансию', int $code = 400, Throwable $previous = null) {
        parent::__construct($message, $code, $previous);
    }
}
