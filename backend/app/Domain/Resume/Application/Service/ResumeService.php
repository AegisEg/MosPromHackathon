<?php

namespace App\Domain\Resume\Application\Service;

use DateTimeImmutable;
use Illuminate\Database\Eloquent\Collection;

class ResumeService {

    /**
     * Получает количество месяцев опыта работы
     * @param Collection $experiences
     * @return float
     */
    static public function getExperienceMonths(Collection $experiences): float {
        return $experiences->sum(function ($experience) {
            if($experience->end_date === null) {
                $experience->end_date = new DateTimeImmutable();
            }
            $diff = $experience->end_date->diff($experience->start_date);
            return ($diff->y * 12) + $diff->m;
        });
    }
}
