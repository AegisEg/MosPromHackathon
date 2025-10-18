<?php
declare(strict_types=1);

namespace App\Domain\Analitics\Application\DTO;

class ExperienceDTO
{
    public function __construct(
        public float $averageExperience,
        public float $medianExperience,
    ) {}

    public function toArray(): array {
        return [
            'averageExperience' => $this->averageExperience,
            'medianExperience'  => $this->medianExperience,
        ];
    }
}
