<?php
declare(strict_types=1);

namespace App\Domain\Vacancy\Application\DTO;

use DateTimeImmutable;

class ShowVacancyDTO
{
    public function __construct(
        public int $id,
        public string $title,
        public string $description,
        public string $companyName,
        public int $companyID,
        public ?string $professionName,
        public string $employmentType,
        /**
         * @var string[]
         */
        public array $skills,
        public ?string $experienceWide,
        public ?int $salaryFrom,
        public ?int $salaryTo,
        public bool $status,
        public DateTimeImmutable $createdAt,
        public DateTimeImmutable $updatedAt,
    ) {}

    public function toArray(): array {
        return [
            'id'             => $this->id,
            'title'          => $this->title,
            'description'    => $this->description,
            'profession'     => $this->professionName,
            'companyName'    => $this->companyName,
            'companyID'      => $this->companyID,
            'skills'         => $this->skills,
            'employmentType' => $this->employmentType,
            'experienceWide' => $this->experienceWide,
            'salaryFrom'     => $this->salaryFrom,
            'salaryTo'       => $this->salaryTo,
            'status'         => $this->status,
            'createdAt'      => $this->createdAt->format('H:i d.m.Y'),
            'updatedAt'      => $this->updatedAt->format('H:i d.m.Y'),
        ];
    }
}
