<?php
declare(strict_types=1);

namespace App\Domain\Vacancy\Application\Action;

use App\Domain\Vacancy\Application\DTO\ShowVacancyDTO;
use App\Domain\Vacancy\Application\Exceptions\ForbiddenVacancyException;
use App\Domain\Vacancy\Application\Exceptions\VacancyNotFoundException;
use App\Models\User;
use App\Models\Vacancies;
use Illuminate\Support\Facades\DB;
use Throwable;

class VacancyAction
{
    public function __construct() {}

    public function show(int $idVacancy): ShowVacancyDTO {
        $vacancy = Vacancies::find($idVacancy);

        if (!$vacancy) {
            throw new VacancyNotFoundException();
        }

        return new ShowVacancyDTO(
            id: $vacancy->id,
            title: $vacancy->title,
            description: $vacancy->description,
            companyName: $vacancy->company->name,
            companyID: $vacancy->company->id,
            professionName: $vacancy->profession?->name,
            employmentType: $vacancy->employment_type->label(),
            experienceWide: $vacancy?->experience_wide?->label(),
            skills: $vacancy->skills->map(function ($skill) {
                return $skill->name;
            })->toArray(),
            salaryFrom: $vacancy->salary_from,
            salaryTo: $vacancy->salary_to,
            status: $vacancy->status,
            createdAt: $vacancy->created_at,
            updatedAt: $vacancy->updated_at,
        );
    }

    public function create(User $user, array $vacancyArray): int {
        try {
            $vacancyArray['user_id'] = $user->id;
            DB::beginTransaction();
            $vacancy = Vacancies::create($vacancyArray);
            $vacancy->skills()->sync($vacancyArray['skills']);
            DB::commit();

            return $vacancy->id;
        } catch (Throwable $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function update(User $user, int $idVacancy, array $vacancyArray): int {
        $vacancy = Vacancies::find($idVacancy);

        if (!$vacancy) {
            throw new VacancyNotFoundException();
        }

        /**
         * @Todo: Если пользователь не является владельцем вакансии, выбрасываем исключение
         */
        if ($vacancy->user_id !== $user->id) {
            throw new ForbiddenVacancyException();
        }

        try {
            DB::beginTransaction();
            $vacancy->update($vacancyArray);

            if (isset($vacancyArray['skills'])) {
                $vacancy->skills()->sync($vacancyArray['skills']);
            }
            DB::commit();
        } catch (Throwable $e) {
            DB::rollBack();
            throw $e;
        }

        return $vacancy->id;
    }

    public function delete(User $user, int $idVacancy): void {
        $vacancy = Vacancies::find($idVacancy);

        if (!$vacancy) {
            throw new VacancyNotFoundException();
        }

        /**
         * @Todo: Если пользователь не является владельцем вакансии, выбрасываем исключение
         */
        if ($vacancy->user_id !== $user->id) {
            throw new ForbiddenVacancyException();
        }

        try {
            DB::beginTransaction();
            $vacancy->skills()->detach();
            $vacancy->delete();
            DB::commit();
        } catch (Throwable $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
