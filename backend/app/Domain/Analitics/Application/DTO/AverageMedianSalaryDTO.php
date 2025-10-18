<?php
declare(strict_types=1);

namespace App\Domain\Analitics\Application\DTO;

class AverageMedianSalaryDTO
{
    public function __construct(
        public float $averageSalary,
        public float $medianSalary,
    ) {}

    public function toArray(): array {
        return [
            'averageSalary' => $this->averageSalary,
            'medianSalary'  => $this->medianSalary,
        ];
    }
}
