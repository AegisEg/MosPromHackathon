<?php
declare(strict_types=1);

namespace App\Domain\Analitics\Application\DTO;

use DateTimeImmutable;
use DateTimeZone;

class InputStatisticDTO
{
    public int $limit;

    public ?DateTimeImmutable $startDate;

    public ?DateTimeImmutable $endDate;

    public ?int $professionId;

    public function __construct(
        int $limit,
        ?string $startDate,
        ?string $endDate,
        ?int $professionId,
    ) {
        $this->limit        = $limit;
        $this->startDate    = $startDate !== null ? new DateTimeImmutable($startDate, new DateTimeZone('UTC')) : null;
        $this->endDate      = $endDate   !== null ? new DateTimeImmutable($endDate, new DateTimeZone('UTC')) : null;
        $this->professionId = $professionId;
    }
}
