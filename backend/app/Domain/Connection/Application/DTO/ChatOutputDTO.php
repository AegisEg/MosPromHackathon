<?php
declare(strict_types=1);

namespace App\Domain\Connection\Application\DTO;

class ChatOutputDTO
{
    public function __construct(
        public int $id,
        public string $title,
        public string $lastMessage,
    ) {}

    public function toArray(): array {
        return [
            'id'          => $this->id,
            'title'       => $this->title,
            'lastMessage' => $this->lastMessage,
        ];
    }
}
