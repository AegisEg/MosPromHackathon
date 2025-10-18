<?php
declare(strict_types=1);

namespace App\Domain\Analitics\Application\Action;

use App\Domain\Analitics\Application\DTO\InputStatisticDTO;
use App\Models\User;
use App\Models\Responds;
use App\Domain\Analitics\Application\DTO\AverageMedianSalaryDTO;
use App\Domain\RespondAndInteraction\Enums\RespondStatus;
use Illuminate\Support\Facades\DB;

class ActionStatisticsVacancy
{
    /**
     * Среднее число откликов на вакансию за период (по компаниям текущего пользователя, если авторизован)
     */
    public function avarageCountRespondsVacancy(InputStatisticDTO $inputDto, User $user): float {
        $query = Responds::query()
            ->whereHas('vacancy.company', function ($q) use ($user) {
                $q->where('user_id', '=', $user->id);
            });

        if ($inputDto->startDate !== null) {
            $query->where('responds.created_at', '>=', $inputDto->startDate->format('Y-m-d H:i:s'));
        }

        if ($inputDto->endDate !== null) {
            $query->where('responds.created_at', '<=', $inputDto->endDate->format('Y-m-d H:i:s'));
        }

        $counts = $query
            ->select('vacancy_id', DB::raw('COUNT(*) as responds_count'))
            ->groupBy('vacancy_id')
            ->pluck('responds_count');

        if ($counts->isEmpty()) {
            return 0.0;
        }

        return (float) $counts->avg();
    }

    /**
     * Средняя и медианная зарплата из резюме по откликам за период (для компаний пользователя)
     */
    public function averageMedianSalaryResponds(InputStatisticDTO $inputDto, User $user): AverageMedianSalaryDTO {
        $query = Responds::query()
            ->whereHas('vacancy.company', function ($q) use ($user) {
                $q->where('user_id', '=', $user->id);
            })
            ->whereHas('resume', function ($q) {
                $q->whereNotNull('salary');
            });

        if ($inputDto->startDate !== null) {
            $query->where('responds.created_at', '>=', $inputDto->startDate->format('Y-m-d H:i:s'));
        }

        if ($inputDto->endDate !== null) {
            $query->where('responds.created_at', '<=', $inputDto->endDate->format('Y-m-d H:i:s'));
        }

        // Получаем список зарплат напрямую через join для эффективности
        $salaries = $query
            ->join('resumes', 'responds.resume_id', '=', 'resumes.id')
            ->pluck('resumes.salary')
            ->filter(fn ($v) => $v !== null)
            ->values();

        if ($salaries->isEmpty()) {
            return new AverageMedianSalaryDTO(averageSalary: 0.0, medianSalary: 0.0);
        }

        $count = $salaries->count();
        $avg   = (float) ($salaries->sum() / $count);

        $sorted = $salaries->sort()->values();

        if ($count % 2 === 1) {
            $median = (float) $sorted->get(intval(floor($count / 2)));
        } else {
            $upperIndex = intval($count / 2);
            $lowerIndex = $upperIndex - 1;
            $median     = (float) (($sorted->get($lowerIndex) + $sorted->get($upperIndex)) / 2);
        }

        return new AverageMedianSalaryDTO(averageSalary: $avg, medianSalary: $median);
    }

    /**
     * Количество откликов по статусам (для компаний пользователя), без фильтра по датам
     * @return array<int, array{status:int,name:string,count:int}>
     */
    public function respondsStatusStats(User $user): array {
        $rows = Responds::query()
            ->whereHas('vacancy.company', function ($q) use ($user) {
                $q->where('user_id', '=', $user->id);
            })
            ->select('status', DB::raw('COUNT(*) as cnt'))
            ->groupBy('status')
            ->get();

        $countsByStatus = [];

        foreach ($rows as $row) {
            // В БД хранится int статус, приводим явно
            $countsByStatus[(int) $row->status->value] = (int) $row->cnt;
        }

        $result = [];

        foreach (RespondStatus::cases() as $case) {
            $statusValue = $case->value;
            $result[]    = [
                'status' => $statusValue,
                'count'  => $countsByStatus[$statusValue] ?? 0,
            ];
        }

        return $result;
    }

    /**
     * Средний возраст соискателя по откликам (для компаний пользователя)
     */
    public function averageAgeResponds(User $user): float {
        $row = Responds::query()
            ->whereHas('vacancy.company', function ($q) use ($user) {
                $q->where('user_id', '=', $user->id);
            })
            ->join('resumes', 'responds.resume_id', '=', 'resumes.id')
            ->whereNotNull('resumes.date_of_birth')
            ->selectRaw('avg(date_part(\'year\', age(now(), resumes.date_of_birth))) as avg_age')
            ->first();

        return $row && isset($row->avg_age) ? (float) $row->avg_age : 0.0;
    }

    /**
     * Таймлайн откликов по датам (день -> количество) для компаний пользователя
     * @return array<int, array{date:string,count:int}>
     */
    public function respondsTimeline(InputStatisticDTO $inputDto, User $user): array {
        $query = Responds::query()
            ->whereHas('vacancy.company', function ($q) use ($user) {
                $q->where('user_id', '=', $user->id);
            });

        // Фильтрация по месяцам: [startMonth, endMonthNext)
        if ($inputDto->startDate !== null) {
            $startMonth = $inputDto->startDate->modify('first day of this month')->setTime(0, 0, 0);
            $query->where('responds.created_at', '>=', $startMonth->format('Y-m-d H:i:s'));
        }

        if ($inputDto->endDate !== null) {
            $endMonthNext = $inputDto->endDate->modify('first day of next month')->setTime(0, 0, 0);
            $query->where('responds.created_at', '<', $endMonthNext->format('Y-m-d H:i:s'));
        }

        $rows = $query
            ->selectRaw('date_trunc(\'month\', responds.created_at) as month, COUNT(*) as cnt')
            ->groupBy(DB::raw('date_trunc(\'month\', responds.created_at)'))
            ->orderBy(DB::raw('date_trunc(\'month\', responds.created_at)'))
            ->get();

        return $rows->map(static function ($row) {
            return [
                'date'  => date('d.m.Y', strtotime((string) $row->month)),
                'count' => (int) $row->cnt,
            ];
        })->toArray();
    }
}
