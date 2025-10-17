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
}