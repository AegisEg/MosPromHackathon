<?php
declare(strict_types=1);

namespace App\Domain\Analitics\Application\DTO;

class TopProfessionDTO
{
    public function __construct(
        public int $professionId,
        public string $professionName,
        public int $resumesCount,
    ) {}

    public function toArray(): array {
        return [
            'professionId'   => $this->professionId,
            'professionName' => $this->professionName,
            'resumesCount'   => $this->resumesCount,
        ];
    }
}
