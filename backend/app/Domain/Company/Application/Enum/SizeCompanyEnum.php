<?php
declare(strict_types=1);

namespace App\Domain\Company\Application\Enum;

enum SizeCompanyEnum: int
{
    case SMALL = 1;
    case MEDIUM = 50;
    case LARGE = 100;
    case VERY_LARGE = 500;
    case ULTRA_LARGE = 1000;

    public function label(): string
    {
        return match($this) {
            self::SMALL => '1-50',
            self::MEDIUM => '51-100',
            self::LARGE => '101-500',
            self::VERY_LARGE => '501-1000',
            self::ULTRA_LARGE => '1001+',
        };
    }

    public static function fromSize(int $size): self
    {
        return match(true) {
            $size <= 50 => self::SMALL,
            $size <= 100 => self::MEDIUM,
            $size <= 500 => self::LARGE,
            $size <= 1000 => self::VERY_LARGE,
            $size > 1000 => self::ULTRA_LARGE,
        };
    }
}