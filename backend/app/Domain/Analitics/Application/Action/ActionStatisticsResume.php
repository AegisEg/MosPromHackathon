<?php
declare(strict_types=1);

namespace App\Domain\Analitics\Application\Action;

use App\Domain\Analitics\Application\DTO\TopProfessionDTO;
use App\Domain\Analitics\Application\DTO\TopSkillDTO;
use App\Domain\Analitics\Application\DTO\AverageMedianSalaryDTO;
use App\Domain\Analitics\Application\DTO\ExperienceDTO;
use App\Domain\Analitics\Application\DTO\InputStatisticDTO;
use Illuminate\Support\Facades\DB;

class ActionStatisticsResume
{
    /**
     * Получить топ профессий по количеству резюме
     * @return TopProfessionDTO[]
     */
    public function topProfessionsResume(InputStatisticDTO $inputDto): array {
        $query = DB::table('resumes')
            ->join('professions', 'resumes.profession_id', '=', 'professions.id')
            ->whereNotNull('resumes.profession_id');

        if ($inputDto->startDate !== null) {
            $query->where('resumes.created_at', '>=', $inputDto->startDate->format('Y-m-d H:i:s'));
        }

        if ($inputDto->endDate !== null) {
            $query->where('resumes.created_at', '<=', $inputDto->endDate->format('Y-m-d H:i:s'));
        }

        $rows = $query
            ->groupBy('professions.id', 'professions.name')
            ->orderByDesc(DB::raw('COUNT(resumes.id)'))
            ->limit($inputDto->limit)
            ->get([
                'professions.id as professionId',
                'professions.name as professionName',
                DB::raw('COUNT(resumes.id) as resumes_count'),
            ]);

        return $rows->map(static function ($row) {
            return new TopProfessionDTO(
                professionId: (int) $row->professionId,
                professionName: (string) $row->professionName,
                resumesCount: (int) $row->resumes_count,
            );
        })->toArray();
    }

    /**
     * Топ популярных навыков по резюме с фильтром по профессии
     * @return TopSkillDTO[]
     */
    public function topSkillsResume(InputStatisticDTO $inputDto): array {
        $rows = DB::table('resumes')
            ->join('resume_skill', 'resumes.id', '=', 'resume_skill.resume_id')
            ->join('skills', 'resume_skill.skill_id', '=', 'skills.id');

        if ($inputDto->startDate !== null) {
            $rows = $rows->where('resumes.created_at', '>=', $inputDto->startDate->format('Y-m-d H:i:s'));
        }

        if ($inputDto->endDate !== null) {
            $rows = $rows->where('resumes.created_at', '<=', $inputDto->endDate->format('Y-m-d H:i:s'));
        }

        if ($inputDto->professionId) {
            $rows = $rows->where('resumes.profession_id', '=', $inputDto->professionId);
        }

        $rows = $rows->groupBy('skills.id', 'skills.name')
            ->orderByDesc(DB::raw('COUNT(DISTINCT resumes.id)'))
            ->limit($inputDto->limit)
            ->get([
                'skills.id as skillId',
                'skills.name as skillName',
                DB::raw('COUNT(DISTINCT resumes.id) as resumescount'),
            ]);

        return $rows->map(static function ($row) {
            return new TopSkillDTO(
                skillId: (int) $row->skillId,
                skillName: (string) $row->skillName,
                vacanciesCount: (int) $row->resumescount,
            );
        })->toArray();
    }

    /**
     * Топ зарплат по резюме с фильтром по профессии
     * @return TopSalaryDTO[]
     */
    public function topSalariesResume(int $limit, ?int $professionId): array {
        return [];
    }

    /**
     * Средняя и медианная зарплата по резюме (опционально по профессии)
     */
    public function averageMedianSalaryResume(InputStatisticDTO $inputDto): AverageMedianSalaryDTO {
        $query = DB::table('resumes')->whereNotNull('salary');

        if ($inputDto->professionId !== null) {
            $query->where('profession_id', '=', $inputDto->professionId);
        }

        if ($inputDto->startDate !== null) {
            $query->where('created_at', '>=', $inputDto->startDate->format('Y-m-d H:i:s'));
        }

        if ($inputDto->endDate !== null) {
            $query->where('created_at', '<=', $inputDto->endDate->format('Y-m-d H:i:s'));
        }

        $row = $query
            ->selectRaw('avg(salary) as avg_salary, percentile_cont(0.5) within group (order by salary) as median_salary')
            ->first();

        $avg    = $row ? (float) $row->avg_salary : 0.0;
        $median = $row ? (float) $row->median_salary : 0.0;

        return new AverageMedianSalaryDTO(
            averageSalary: $avg,
            medianSalary: $median,
        );
    }

    /**
     * Средняя и медианная зарплата по всем вакансиям
     */
    public function averageMedianSalaryVacancies(InputStatisticDTO $inputDto): AverageMedianSalaryDTO {
        $row = DB::table(DB::raw('(
                select ((coalesce(salary_from, salary_to) + coalesce(salary_to, salary_from)) / 2.0) as mid
                from vacancies
                where salary_from is not null or salary_to is not null
            ) v'))
            ->selectRaw('avg(mid) as avg_salary, percentile_cont(0.5) within group (order by mid) as median_salary')
            ->first();

        $avg    = $row ? (float) $row->avg_salary : 0.0;
        $median = $row ? (float) $row->median_salary : 0.0;

        return new AverageMedianSalaryDTO(
            averageSalary: $avg,
            medianSalary: $median,
        );
    }

    public function experienceResume(InputStatisticDTO $inputDto): ExperienceDTO {
        // Подсчитываем месяцы опыта по каждому резюме на основе записей в experiences
        $resumeMonthsSub = DB::table('experiences')
            ->select([
                'resume_id',
                DB::raw('SUM((date_part(\'year\', age(coalesce(end_date, now()), start_date)) * 12) + date_part(\'month\', age(coalesce(end_date, now()), start_date))) as months_total'),
            ])
            ->groupBy('resume_id');

        $query = DB::table('resumes');

        if ($inputDto->professionId !== null) {
            $query->where('resumes.profession_id', '=', $inputDto->professionId);
        }

        if ($inputDto->startDate !== null) {
            $query->where('resumes.created_at', '>=', $inputDto->startDate->format('Y-m-d H:i:s'));
        }

        if ($inputDto->endDate !== null) {
            $query->where('resumes.created_at', '<=', $inputDto->endDate->format('Y-m-d H:i:s'));
        }

        $query->joinSub($resumeMonthsSub, 'rm', 'resumes.id', '=', 'rm.resume_id');
        $row = $query
            ->selectRaw('avg(coalesce(rm.months_total, 0)) as avg_experience, percentile_cont(0.5) within group (order by coalesce(rm.months_total, 0)) as median_experience')
            ->first();

        $avg    = $row ? (float) $row->avg_experience : 0.0;
        $median = $row ? (float) $row->median_experience : 0.0;

        return new ExperienceDTO(
            averageExperience: $avg,
            medianExperience: $median,
        );
    }
}
