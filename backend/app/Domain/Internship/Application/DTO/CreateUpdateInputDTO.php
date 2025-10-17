<?php
declare(strict_types=1);

namespace App\Domain\Internship\Application\DTO;

use DateTimeImmutable;
use DateTimeZone;

class CreateUpdateInputDTO
{
    /**
     * Специальность
     */
    public string $speciality;

    /**
     * Количество студентов
     */
    public int $countStudents;

    /**
     * Дата начала периода
     */
    public DateTimeImmutable $startDatePeriod;

    /**
     * Дата окончания периода
     */
    public DateTimeImmutable $endDatePeriod;

    public function __construct(
        string $speciality,
        int $countStudents,
        string $startDatePeriod,
        string $endDatePeriod,
    ) {
        $this->speciality      = $speciality;
        $this->countStudents   = $countStudents;
        $this->startDatePeriod = new DateTimeImmutable($startDatePeriod, new DateTimeZone('UTC'));
        $this->endDatePeriod   = new DateTimeImmutable($endDatePeriod, new DateTimeZone('UTC'));
    }

    public function toArray(): array {
        return [
            'speciality'        => $this->speciality,
            'count_students'    => $this->countStudents,
            'start_date_period' => $this->startDatePeriod->format('Y-m-d\TH:i:sP'),
            'end_date_period'   => $this->endDatePeriod->format('Y-m-d\TH:i:sP'),
        ];
    }
}
