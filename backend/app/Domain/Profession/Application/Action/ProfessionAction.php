<?php

declare(strict_types=1);

namespace App\Domain\Profession\Application\Action;

use App\Domain\Profession\Application\DTO\ProfessionDTO;
use App\Domain\Profession\Application\DTO\SkillDTO;
use App\Domain\Profession\Application\Exceptions\ProfessionNotFoundException;
use App\Models\Professions;

class ProfessionAction
{
    /**
     * Получить список всех профессий
     * @return ProfessionDTO[]
     */
    public function professionList(): array {
        $professions    = Professions::all();
        $professionsDTO = [];

        foreach ($professions as $profession) {
            $professionsDTO[] = new ProfessionDTO(
                id: $profession->id,
                name: $profession->name,
            );
        }

        return $professionsDTO;
    }

    /**
     * Получить информацию о профессии
     * @param int $idProfession
     * @return ProfessionDTO
     * @throws ProfessionNotFoundException
     */
    public function showProfestion(int $idProfession): ProfessionDTO {
        $profession = Professions::find($idProfession);

        if (!$profession) {
            throw new ProfessionNotFoundException();
        }

        return new ProfessionDTO(
            id: $profession->id,
            name: $profession->name,
        );
    }

    /**
     * Получить список навыков для профессии
     * @param int $idProfession
     * @return SkillDTO[]
     * @throws ProfessionNotFoundException
     */
    public function professionSkills(int $idProfession): array {
        $profession = Professions::find($idProfession);

        if (!$profession) {
            throw new ProfessionNotFoundException();
        }

        $skills    = $profession->skills;
        $skillsDTO = [];

        foreach ($skills as $skill) {
            $skillsDTO[] = new SkillDTO(
                id: $skill->id,
                name: $skill->name,
            );
        }

        return $skillsDTO;
    }
}
