<?php
declare(strict_types=1);

namespace App\Enums;

enum UserRole: int
{
    case EMPLOYER   = 1;
    case JOB_SEEKER = 2;
    case ADMIN      = 3;
    case INSTITUTE  = 4;

    public function label(): string {
        return match ($this) {
            self::EMPLOYER   => 'Работодатель',
            self::JOB_SEEKER => 'Соискатель',
            self::ADMIN      => 'Администратор',
            self::INSTITUTE  => 'Институт',
        };
    }

    public function value(): string {
        return match ($this) {
            self::EMPLOYER   => 'employer',
            self::JOB_SEEKER => 'job_seeker',
            self::ADMIN      => 'admin',
            self::INSTITUTE  => 'institute',
        };
    }
}
