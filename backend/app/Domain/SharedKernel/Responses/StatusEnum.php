<?php
declare(strict_types=1);

namespace App\Domain\SharedKernel\Responses;

enum StatusEnum: string
{
    case OK   = 'ok';
    case FAIL = 'fail';
}