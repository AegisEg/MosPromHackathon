<?php

namespace App\Domain\RespondAndInteraction\Enums;

enum RespondStatus: int
{
    case NEW = 0; // новый
    case IN_REVIEW = 1; // в рассмотрении
    case INTERVIEW = 2; // интервью
    case OFFER = 3; // предложение
    case REJECTED = 4; // отклонено
    case HIRED = 5; // нанят

    public function label(): string {
        return match($this) {
            self::NEW => 'Новый',
            self::IN_REVIEW => 'В рассмотрении',
            self::INTERVIEW => 'Интервью',
            self::OFFER => 'Предложение',
            self::REJECTED => 'Отклонено',
            self::HIRED => 'Нанят',
        };
    }

    public function value(): string {
        return match($this) {
            self::NEW => 'new',
            self::IN_REVIEW => 'in_review',
            self::INTERVIEW => 'interview',
            self::OFFER => 'offer',
            self::REJECTED => 'rejected',
            self::HIRED => 'hired',
        };
    }
}