<?php
declare(strict_types=1);

namespace App\Domain\RespondAndInteraction\Application\Action;

use App\Domain\Company\Application\Exceptions\NotFoundCompanyException;
use App\Domain\RespondAndInteraction\Application\Exceptions\ForbiddenRespondException;
use App\Domain\RespondAndInteraction\Application\Exceptions\RespondNotFoundException;
use App\Domain\RespondAndInteraction\Application\Services\BestMatchService;
use App\Domain\RespondAndInteraction\Enums\RespondStatus;
use App\Domain\Resume\Application\Service\ResumeService;
use App\Models\Responds;
use App\Models\Resume;
use App\Models\User;
use App\Models\Vacancies;
use Throwable;

class RespondAndInteractionAction {

    public function getRespondsByVacancy(User $user, int $vacancyId): array {

        if ($user->id !== Vacancies::find($vacancyId)->user_id) {
            throw new ForbiddenRespondException();
        }

        $responds = Responds::where('vacancy_id', $vacancyId)->get();

        if (!$responds) {
            throw new RespondNotFoundException();
        }

        $resumes = Resume::whereIn('id', $responds->pluck('resume_id'))->get();

        
        $resumes = $resumes->map(function ($resume) {
            $result = [
                'id' => $resume->id,
                'profession' => $resume->profession->name,
                'first_name' => $resume->user->first_name,
                'middle_name' => $resume->user->middle_name,
                'last_name' => $resume->user->last_name,
                'email' => $resume->user->email,
                'phone' => $resume->phone,
                'date_of_birth' => $resume->date_of_birth?->format('d.m.Y'),
                'country' => $resume->country,
                'city' => $resume->city,
                'about' => $resume->about,
                'salary' => $resume->salary,
                'status' => $resume->status,
                'education' => $resume->educations->map(function ($education) {
                        return [
                            'id' => $education->id,
                            'institution_name' => $education->institution_name,
                            'degree' => $education->degree,
                            'specialization' => $education->specialization,
                            'start_date' => $education->start_date?->format('d.m.Y'),
                            'end_date' => $education->end_date?->format('d.m.Y'),
                        ];
                    }),
                'experience_time' => ResumeService::getExperienceMonths($resume->experiences),
                'experiences' => $resume->experiences->map(function ($experience) {
                        return [
                            'id' => $experience->id,
                            'company_name' => $experience->company_name,
                            'position' => $experience->position,
                            'start_date' => $experience->start_date?->format('d.m.Y'),
                            'end_date' => $experience->end_date?->format('d.m.Y'),
                            'description' => $experience->description,
                        ];
                    }),
                'skills' => $resume->skills->map(function ($skill) {
                    return [
                        'id' => $skill->id,
                        'name' => $skill->name,
                    ];
                }),
            ];
            return $result;
        });

        $result = [
            'total' => $responds->count(),
            'resumes' => $resumes->toArray(),
        ];
        return $result;
    }

    public function updateRespondStatus(User $user, int $respondId, int $status): void {

        $respond = Responds::find($respondId);
        if (!$respond) {
            throw new RespondNotFoundException();
        }
        if ($respond->vacancy->user_id !== $user->id) {
            throw new ForbiddenRespondException();
        }
        $status = RespondStatus::tryFrom($status);
        $respond->status = $status;
        $respond->save();
    }

    public function bestMatchResumesByVacancy(int $vacancyId): array {
        $vacancy = Vacancies::with(['skills', 'profession'])->find($vacancyId);
        if (!$vacancy) {
            throw new NotFoundCompanyException();
        }

        $responds = Responds::where('vacancy_id', $vacancyId)->get();
        if ($responds->isEmpty()) {
            throw new RespondNotFoundException();
        }

        // Получаем резюме с их связями
        $resumes = Resume::with(['skills', 'profession', 'experiences', 'educations', 'user'])
            ->whereIn('id', $responds->pluck('resume_id'))
            ->get();

        // Вычисляем совпадения для каждого резюме
        $scoredResumes = $resumes->map(function ($resume) use ($vacancy) {
            $score = BestMatchService::calculateMatchScore($resume, $vacancy);
            
            return [
                'resume' => $resume,
                'score' => $score,
                'match_details' => BestMatchService::getMatchDetails($resume, $vacancy)
            ];
        });

        // Сортируем по убыванию оценки совпадения
        $sortedResumes = $scoredResumes->sortByDesc('score');

        // Возвращаем топ-5 наиболее подходящих резюме
        $topResumes = $sortedResumes->take(5)->map(function ($item) {
            $resume = $item['resume'];
            return [
                'id' => $resume->id,
                'profession' => $resume->profession->name,
                'first_name' => $resume->user->first_name,
                'middle_name' => $resume->user->middle_name,
                'last_name' => $resume->user->last_name,
                'date_of_birth' => $resume->date_of_birth?->format('d.m.Y'),
                'country' => $resume->country,
                'city' => $resume->city,
                'status' => $resume->status,
                'match_score' => round($item['score'], 2),
                'match_details' => $item['match_details'],
            ];
        });

        return [
            'total' => $topResumes->count(),
            'top_matches' => $topResumes->values()->toArray(),
        ];
    }

}