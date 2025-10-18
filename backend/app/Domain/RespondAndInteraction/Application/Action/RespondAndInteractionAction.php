<?php
declare(strict_types=1);

namespace App\Domain\RespondAndInteraction\Application\Action;

use App\Domain\RespondAndInteraction\Application\Exceptions\ForbiddenRespondException;
use App\Domain\RespondAndInteraction\Application\Exceptions\RespondNotFoundException;
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
}