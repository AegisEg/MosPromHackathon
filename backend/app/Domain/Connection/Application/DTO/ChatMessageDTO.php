<?php
declare(strict_types=1);

namespace App\Domain\Connection\Application\DTO;

class ChatMessageDTO
{
    /** @param ChatMessageFileDTO[] $files */
    public function __construct(
        public int $id,
        public ?string $text,
        public string $createdAt,
        public ?int $userId,
        public ?string $userName,
        public array $files = [],
    ) {}

    public function toArray(): array {
        return [
            'id'        => $this->id,
            'text'      => $this->text,
            'createdAt' => $this->createdAt,
            'user'      => $this->userId ? ['id' => $this->userId, 'name' => $this->userName] : null,
            'files'     => array_map(static fn (ChatMessageFileDTO $f) => $f->toArray(), $this->files),
        ];
    }
}
