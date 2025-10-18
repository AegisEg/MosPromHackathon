<?php

namespace App\Enums;

enum EmploymentType: int
{
    case UNKNOWN = 0;
    case FULL_TIME = 1;
    case PART_TIME = 2;
    case CONTRACT = 3;
    case INTERNSHIP = 4;
    case FREELANCE = 5;

    public function label(): string
    {
        return match($this) {
            self::FULL_TIME => 'Полная занятость',
            self::PART_TIME => 'Частичная занятость',
            self::CONTRACT => 'Договор',
            self::INTERNSHIP => 'Стажировка',
            self::FREELANCE => 'Фриланс',
            default => 'Неизвестно',
        };
    }

    public function value(): string
    {
        return match($this) {
            self::FULL_TIME => 'full_time',
            self::PART_TIME => 'part_time',
            self::CONTRACT => 'contract',
            self::INTERNSHIP => 'internship',
            self::FREELANCE => 'freelance',
            default => 'unknown',
        };
    }
}
