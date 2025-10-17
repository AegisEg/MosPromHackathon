<?php
declare(strict_types=1);

namespace App\Domain\Internship\Application\Action;

use App\Domain\Internship\Application\DTO\CreateUpdateInputDTO;
use App\Domain\Internship\Application\DTO\ShowInternshipDTO;
use App\Domain\Internship\Application\Exceptions\ForbiddenInternshipException;
use App\Domain\Internship\Application\Exceptions\InternshipNotFoundException;
use App\Models\Internship;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Throwable;

class InternshipAction
{
    public function __construct() {}

    public function show(int $idInternship): ShowInternshipDTO {
        $internship = Internship::find($idInternship);

        if (!$internship) {
            throw new InternshipNotFoundException();
        }

        return new ShowInternshipDTO(
            id: $internship->id,
            speciality: $internship->speciality,
            countStudents: $internship->count_students,
            startDatePeriod: $internship->start_date_period,
            endDatePeriod: $internship->end_date_period,
            createdAt: $internship->created_at,
            updatedAt: $internship->updated_at,
        );
    }

    public function create(User $user, CreateUpdateInputDTO $internshipData): int {
        try {
            $internshipArray            = $internshipData->toArray();
            $internshipArray['user_id'] = $user->id;
            DB::beginTransaction();
            $internship = Internship::create($internshipArray);
            DB::commit();

            return $internship->id;
        } catch (Throwable $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function update(User $user, int $idInternship, CreateUpdateInputDTO $internshipData): int {
        $internship = Internship::find($idInternship);

        if (!$internship) {
            throw new InternshipNotFoundException();
        }

        /**
         * Если пользователь не является владельцем стажировки, выбрасываем исключение
         */
        if ($internship->user_id !== $user->id) {
            throw new ForbiddenInternshipException();
        }

        try {
            DB::beginTransaction();
            $internship->update($internshipData->toArray());
            DB::commit();
        } catch (Throwable $e) {
            DB::rollBack();
            throw $e;
        }

        return $internship->id;
    }

    public function delete(User $user, int $idInternship): void {
        $internship = Internship::find($idInternship);

        if (!$internship) {
            throw new InternshipNotFoundException();
        }

        /**
         * Если пользователь не является владельцем стажировки, выбрасываем исключение
         */
        if ($internship->user_id !== $user->id) {
            throw new ForbiddenInternshipException();
        }

        try {
            DB::beginTransaction();
            $internship->delete();
            DB::commit();
        } catch (Throwable $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
