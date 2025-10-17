<?php
declare(strict_types=1);

namespace App\Domain\Internship\Application\DTO;

use DateTimeImmutable;

class ShowInternshipDTO
{
    public function __construct(
        public int $id,
        public string $speciality,
        public int $countStudents,
        public DateTimeImmutable $startDatePeriod,
        public DateTimeImmutable $endDatePeriod,
        public DateTimeImmutable $createdAt,
        public DateTimeImmutable $updatedAt,
    ) {}

    public function toArray(): array {
        return [
            'id'              => $this->id,
            'speciality'      => $this->speciality,
            'countStudents'   => $this->countStudents,
            'startDatePeriod' => $this->startDatePeriod->format('d.m.Y'),
            'endDatePeriod'   => $this->endDatePeriod->format('d.m.Y'),
        ];
    }
}
