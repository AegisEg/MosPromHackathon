<?php

namespace App\Enums;

enum ExperienceLevel: int
{
    case NO_EXPERIENCE = 0;     // 0 месяцев
    case JUNIOR = 12;           // 1 год (12 месяцев)
    case MIDDLE = 36;           // 3 года (36 месяцев)
    case SENIOR = 60;           // 5 лет (60 месяцев)
    case LEAD = 120;            // 10 лет (120 месяцев)

    public function label(): string
    {
        return match($this) {
            self::NO_EXPERIENCE => 'Без опыта',
            self::JUNIOR => '1 год',
            self::MIDDLE => '3 года',
            self::SENIOR => '5 лет',
            self::LEAD => '10+ лет',
        };
    }

    public function description(): string
    {
        return match($this) {
            self::NO_EXPERIENCE => 'Без опыта работы',
            self::JUNIOR => 'Начальный уровень (1 год)',
            self::MIDDLE => 'Средний уровень (3 года)',
            self::SENIOR => 'Высокий уровень (5 лет)',
            self::LEAD => 'Экспертный уровень (10+ лет)',
        };
    }

    public function months(): int
    {
        return $this->value;
    }

    public function years(): float
    {
        return round($this->value / 12, 1);
    }
}
