<?php

namespace App\Domain\RespondAndInteraction\Application\Services;

use App\Domain\Resume\Application\Service\ResumeService;
use App\Models\Resume;
use App\Models\Vacancies;
use App\Enums\EmploymentType;

class BestMatchService {
    public function __construct() {}


    /**
     * Вычисляет оценку совпадения резюме с вакансией
     */
    static public function calculateMatchScore(Resume $resume, Vacancies $vacancy): float {
        $score = 0;
        $maxScore = 100;

        // 1. Совпадение профессии (30 баллов)
        if ($resume->profession_id === $vacancy->profession_id) {
            $score += 30;
        }

        // 2. Совпадение навыков (40 баллов)
        $resumeSkillIds = $resume->skills->pluck('id')->toArray();
        $vacancySkillIds = $vacancy->skills->pluck('id')->toArray();
        
        if (!empty($vacancySkillIds)) {
            $matchingSkills = array_intersect($resumeSkillIds, $vacancySkillIds);
            $skillMatchPercentage = count($matchingSkills) / count($vacancySkillIds);
            $score += $skillMatchPercentage * 40;
        }

        // 3. Соответствие зарплаты (20 баллов)
        if ($resume->salary && $vacancy->salary_from && $vacancy->salary_to) {
            if ($resume->salary >= $vacancy->salary_from && $resume->salary <= $vacancy->salary_to) {
                $score += 20; // Полное совпадение
            } elseif ($resume->salary >= $vacancy->salary_from * 0.8 && $resume->salary <= $vacancy->salary_to * 1.2) {
                $score += 15; // Частичное совпадение (±20%)
            } elseif ($resume->salary >= $vacancy->salary_from * 0.6 && $resume->salary <= $vacancy->salary_to * 1.4) {
                $score += 10; // Слабое совпадение (±40%)
            }
        }

        // 4. Опыт работы (10 баллов)
        $experienceMonths = ResumeService::getExperienceMonths($resume->experiences);
        $requiredExperience = $vacancy->experience_wide->value;
        
        if ($experienceMonths >= $requiredExperience) {
            $score += 10;
        } elseif ($experienceMonths >= $requiredExperience * 0.7) {
            $score += 7; // 70% от требуемого опыта
        } elseif ($experienceMonths >= $requiredExperience * 0.5) {
            $score += 5; // 50% от требуемого опыта
        }

        // 5. Совпадение типа занятости (10 баллов)
        if($resume->employment_type != EmploymentType::UNKNOWN && $vacancy->employment_type != EmploymentType::UNKNOWN) { 
            if ($resume->employment_type === $vacancy->employment_type) {
                $score += 10;
            }
        }

        return min($score, $maxScore);
    }

    /**
     * Получает детали совпадения для отображения
     */
    static public function getMatchDetails(Resume $resume, Vacancies $vacancy): array {
        $details = [];

        // Совпадение профессии
        $details['profession_match'] = $resume->profession_id === $vacancy->profession_id;

        // Совпадение навыков
        $resumeSkillIds = $resume->skills->pluck('id')->toArray();
        $vacancySkillIds = $vacancy->skills->pluck('id')->toArray();
        $matchingSkills = array_intersect($resumeSkillIds, $vacancySkillIds);
        
        $details['skills'] = [
            'matching' => count($matchingSkills),
            'required' => count($vacancySkillIds),
            'percentage' => count($vacancySkillIds) > 0 ? round((count($matchingSkills) / count($vacancySkillIds)) * 100, 1) : 0,
            'matching_skill_names' => $resume->skills->whereIn('id', $matchingSkills)->pluck('name')->toArray()
        ];

        // Соответствие зарплаты
        $details['salary_match'] = 'none';
        if ($resume->salary && $vacancy->salary_from && $vacancy->salary_to) {
            if ($resume->salary >= $vacancy->salary_from && $resume->salary <= $vacancy->salary_to) {
                $details['salary_match'] = 'perfect';
            } elseif ($resume->salary >= $vacancy->salary_from * 0.8 && $resume->salary <= $vacancy->salary_to * 1.2) {
                $details['salary_match'] = 'good';
            } elseif ($resume->salary >= $vacancy->salary_from * 0.6 && $resume->salary <= $vacancy->salary_to * 1.4) {
                $details['salary_match'] = 'acceptable';
            }
        }

        // Опыт работы
        $experienceMonths = ResumeService::getExperienceMonths($resume->experiences);
        $requiredExperience = $vacancy->experience_wide->value;
        $details['experience'] = [
            'candidate_months' => $experienceMonths,
            'required_months' => $requiredExperience,
            'match_percentage' => $requiredExperience > 0 ? round(($experienceMonths / $requiredExperience) * 100, 1) : 0
        ];

        // Совпадение типа занятости
        $details['employment_type_match'] = $resume->employment_type === $vacancy->employment_type;
        if($resume->employment_type != EmploymentType::UNKNOWN && $vacancy->employment_type != EmploymentType::UNKNOWN) { 
            if ($resume->employment_type === $vacancy->employment_type) {
                $details['employment_type_match'] = true;
            }
        }

        return $details;
    }

    /**
     * Конвертирует уровень опыта в месяцы
     */
    static public function getRequiredExperienceMonths($experienceLevel): int {
        return match($experienceLevel->value) {
            'no_experience' => 0,
            'junior' => 12, // 1 год
            'middle' => 36, // 3 года
            'senior' => 60, // 5 лет
            'lead' => 84,   // 7 лет
            default => 0
        };
    }
}