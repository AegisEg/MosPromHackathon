<?php

namespace App\Domain\Resume\Application\Exception;

class NotFoundResumeException extends \Exception
{
    public function __construct(string $message = 'Резюме не найдено', int $code = 0, \Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}