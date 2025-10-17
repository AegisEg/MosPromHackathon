<?php

namespace App\Domain\Resume\Application\Action;

use App\Domain\Resume\Application\Exception\NotFoundResumeException;
use App\Domain\Resume\Application\Service\ResumeService;
use App\Domain\SharedKernel\Services\DateHelper;
use App\Models\Resume;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Throwable;

class ResumeAction {
    public function __construct() {}

    /**
     * Получить резюме по ID
     * @param int $id
     * @return array
     * @throws NotFoundResumeException
     */
    public function getResume(int $id): array {
        $resume = Resume::find($id);

        if (!$resume) {
            throw new NotFoundResumeException();
        }

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
    }

    public function createResume(User $user, array $resumeArray): int {
        $resumeArray['user_id'] = $user->id;
        DB::beginTransaction();
        try {
            $resume = Resume::create($resumeArray);
            if(isset($resumeArray['educations']) && is_array($resumeArray['educations'])) {
                $resume->educations()->createMany(DateHelper::sortByStartDate($resumeArray['educations']));
            }
            if(isset($resumeArray['experiences']) && is_array($resumeArray['experiences'])) {
                $resume->experiences()->createMany(DateHelper::sortByStartDate($resumeArray['experiences']));
            }
            if(isset($resumeArray['skills']) && is_array($resumeArray['skills'])) {
                $resume->skills()->sync($resumeArray['skills']);
            }
            DB::commit();
            return $resume->id;
        } catch (Throwable $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function updateResume(int $id, array $resumeArray): int {
        $resume = Resume::find($id);
        if (!$resume) {
            throw new NotFoundResumeException();
        }

        DB::beginTransaction();
        try {
            // Обновляем основные данные резюме
            $resume->update($resumeArray);

            // Обновляем образования (удаляем старые и создаем новые)
            if (isset($resumeArray['educations']) && is_array($resumeArray['educations'])) {
                $resume->educations()->delete();
                $resume->educations()->createMany(DateHelper::sortByStartDate($resumeArray['educations']));
            }
            
            // Обновляем опыт работы (удаляем старые и создаем новые)
            if (isset($resumeArray['experiences']) && is_array($resumeArray['experiences'])) {
                $resume->experiences()->delete();
                $resume->experiences()->createMany(DateHelper::sortByStartDate($resumeArray['experiences']));
            }
            
            // Синхронизация навыков (BelongsToMany - можно использовать sync)
            if (isset($resumeArray['skills']) && is_array($resumeArray['skills'])) {
                $resume->skills()->sync($resumeArray['skills']);
            }
            
            DB::commit();
            return $resume->id;
        } catch (Throwable $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function deleteResume(int $id): void {
        $resume = Resume::find($id);
        if (!$resume) {
            throw new NotFoundResumeException();
        }
        DB::beginTransaction();
        try {
            $resume->delete();
            DB::commit();
        } catch (Throwable $e) {
            DB::rollBack();
            throw $e;
        }
    }
}