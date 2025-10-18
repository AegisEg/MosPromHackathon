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
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Log;
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

        // Получаем уникальные ID резюме и проверяем их существование
        $allResumeIds = $responds->pluck('resume_id');
        $uniqueResumeIds = $allResumeIds->unique()->filter();
        
        // Логируем для отладки
        Log::info('Responds analysis', [
            'total_responds' => $responds->count(),
            'total_resume_ids' => $allResumeIds->count(),
            'unique_resume_ids' => $uniqueResumeIds->count(),
            'duplicates_count' => $allResumeIds->count() - $uniqueResumeIds->count()
        ]);
        
        $resumes = Resume::whereIn('id', $uniqueResumeIds)->get();
        
        // Логируем количество найденных резюме
        Log::info('Resumes found', [
            'requested_resume_ids' => $uniqueResumeIds->count(),
            'found_resumes' => $resumes->count(),
            'missing_resumes' => $uniqueResumeIds->count() - $resumes->count()
        ]);

        
        $resumes = $resumes->map(function ($resume) use ($vacancyId) {
            $respond = $resume->responds->where('vacancy_id', $vacancyId)->first();
            
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
                'experience_time' => ResumeService::getExperienceMonths($resume->experiences),
                'respond_id' => $respond?->id,
                'respond_status' => $respond?->status?->label(),

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

    /**
     * Получить топ N наиболее подходящих резюме для вакансии без ИИ
     * @param int $vacancyId
     * @return array
     * @throws NotFoundCompanyException
     * @throws RespondNotFoundException
     */
    public function bestMatchResumesByVacancyWithSmart(int $vacancyId): array {
        
        $sortedResumes = $this->bestMatchResumesByVacancy($vacancyId);

        $vacancy = Vacancies::with(['skills', 'profession'])->find($vacancyId);
        // Возвращаем топ-10 наиболее подходящих резюме
        $topResumes = $sortedResumes->take(10)->map(function ($item) use ($vacancy) {
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
                'respond_id' => $resume->responds->where('vacancy_id', $vacancy->id)->first()?->id,
                'respond_status' => $resume->responds->where('vacancy_id', $vacancy->id)->first()?->status->label(),
                'match_score' => round($item['score'], 2),
                'match_details' => $item['match_details'],
            ];
        });

        return [
            'total' => $topResumes->count(),
            'top_matches' => $topResumes->values()->toArray(),
        ];
    }


    private function bestMatchResumesByVacancy(int $vacancyId) {
        $vacancy = Vacancies::with(['skills', 'profession'])->find($vacancyId);
        if (!$vacancy) {
            throw new NotFoundCompanyException();
        }

        $responds = Responds::where('vacancy_id', $vacancyId)->get();
        if ($responds->isEmpty()) {
            throw new RespondNotFoundException();
        }

        // Получаем резюме с их связями (уникальные ID)
        $uniqueResumeIds = $responds->pluck('resume_id')->unique()->filter();
        
        $resumes = Resume::with(['skills', 'profession', 'experiences', 'educations', 'user'])
            ->whereIn('id', $uniqueResumeIds)
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

        return $sortedResumes;
    }

    public function bestMatchResumesByVacancyWithAI(int $vacancyId): array {
        $vacancy = Vacancies::with(['skills', 'profession'])->find($vacancyId);
        if (!$vacancy) {
            throw new NotFoundCompanyException();
        }

        $responds = Responds::where('vacancy_id', $vacancyId)->get();
        if ($responds->isEmpty()) {
            throw new RespondNotFoundException();
        }
        
        // TODO: Implement AI-based matching logic
        // return $this->bestMatchResumesByVacancy($vacancyId);
    }

}