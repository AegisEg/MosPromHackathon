<?php
declare(strict_types=1);

namespace App\Domain\Connection\Application\DTO;

class ChatMessageFileDTO
{
    public function __construct(
        public string $path,
        public ?string $originalName,
        public ?int $size,
        public ?string $mimeType,
    ) {}

    public function toArray(): array {
        return [
            'path'         => $this->path,
            'originalName' => $this->originalName,
            'size'         => $this->size,
            'mimeType'     => $this->mimeType,
        ];
    }
}
