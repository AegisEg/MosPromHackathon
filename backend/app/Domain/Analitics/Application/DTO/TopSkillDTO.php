<?php
declare(strict_types=1);

namespace App\Domain\Analitics\Application\DTO;

class TopSkillDTO
{
    public function __construct(
        public int $skillId,
        public string $skillName,
        public int $vacanciesCount,
    ) {}

    public function toArray(): array {
        return [
            'skillId'        => $this->skillId,
            'skillName'      => $this->skillName,
            'vacanciesCount' => $this->vacanciesCount,
        ];
    }
}
