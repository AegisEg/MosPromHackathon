<?php

namespace App\Domain\SharedKernel\Services;

use DateTimeImmutable;

class DateHelper {
    /**
     * Сортирует массив с датами по полю start_date (по возрастанию или убыванию)
     *
     * @param array $arrayWithDate
     * @param string $direction 'asc' | 'desc'
     * @return array
     */
    static public function sortByStartDate(array $arrayWithDate, string $direction = 'asc'): array
    {
        usort($arrayWithDate, function ($a, $b) use ($direction) {
            $hasDateA = isset($a['start_date']) && !empty($a['start_date']);
            $hasDateB = isset($b['start_date']) && !empty($b['start_date']);

            // Если у обоих нет даты, они равны
            if (!$hasDateA && !$hasDateB) {
                return 0;
            }

            // Элементы без даты идут в начало (возвращаем отрицательное значение для A)
            if (!$hasDateA) {
                return -1;
            }

            if (!$hasDateB) {
                return 1;
            }

            $dateA = DateTimeImmutable::createFromFormat('d.m.Y', $a['start_date']);
            $dateB = DateTimeImmutable::createFromFormat('d.m.Y', $b['start_date']);

            // Если даты не удалось распарсить, считаем их как отсутствующие
            if (!$dateA && !$dateB) {
                return 0;
            }

            if (!$dateA) {
                return -1;
            }

            if (!$dateB) {
                return 1;
            }

            if ($dateA == $dateB) {
                return 0;
            }

            $result = $dateA <=> $dateB;

            return $direction === 'desc' ? -$result : $result;
        });

        return $arrayWithDate;
    }
}