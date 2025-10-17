<?php
declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Vacancies;
use App\Models\Companies;
use App\Models\Professions;
use App\Models\Skills;
use App\Enums\EmploymentType;
use App\Enums\ExperienceLevel;
use App\Models\User;
use Illuminate\Database\Seeder;

class VacanciesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void {
        // Получаем компании и профессии
        $companies   = Companies::take(3)->get();
        $professions = Professions::all(); // Берем все профессии
        $skills      = Skills::take(10)->get();
        $users       = User::take(1)->get();

        if ($companies->count() < 3 || $professions->count() < 3) {
            $this->command->warn('Недостаточно компаний или профессий. Сначала запустите CompaniesSeeder и ProfessionsSeeder.');

            return;
        }

        $vacancies = [
            [
                'company_id'      => $companies[0]->id,
                'user_id'         => $users[0]->id,
                'title'           => 'Senior PHP Developer',
                'profession_id'   => $professions[0]->id, // Программист
                'description'     => 'Ищем опытного PHP разработчика для работы над крупными веб-проектами. Требуется знание Laravel, MySQL, Git. Опыт работы от 3 лет.',
                'employment_type' => EmploymentType::FULL_TIME,
                'experience_wide' => ExperienceLevel::MIDDLE->value,
                'salary_from'     => 120000,
                'salary_to'       => 180000,
                'status'          => true,
            ],
            [
                'company_id'      => $companies[1]->id,
                'user_id'         => $users[0]->id,
                'title'           => 'Менеджер по продажам медицинского оборудования',
                'profession_id'   => $professions[1]->id, // Менеджер по продажам
                'description'     => 'Активные продажи медицинского оборудования клиникам и больницам. Ведение клиентской базы, проведение презентаций, работа с возражениями.',
                'employment_type' => EmploymentType::FULL_TIME,
                'experience_wide' => ExperienceLevel::JUNIOR->value,
                'salary_from'     => 80000,
                'salary_to'       => 120000,
                'status'          => true,
            ],
            [
                'company_id'      => $companies[2]->id,
                'user_id'         => $users[0]->id,
                'title'           => 'HR-консультант',
                'profession_id'   => $professions[9]->id, // HR-менеджер
                'description'     => 'Консультирование клиентов по вопросам управления персоналом, подбор кадров, разработка HR-стратегий. Опыт работы в HR от 2 лет.',
                'employment_type' => EmploymentType::PART_TIME,
                'experience_wide' => ExperienceLevel::JUNIOR->value,
                'salary_from'     => 60000,
                'salary_to'       => 90000,
                'status'          => true,
            ],
        ];

        foreach ($vacancies as $vacancyData) {
            $vacancy = Vacancies::create($vacancyData);

            // Привязываем случайные навыки к вакансии
            if ($skills->count() > 0) {
                $randomSkills = $skills->random(rand(3, min(6, $skills->count())));
                $vacancy->skills()->sync($randomSkills->pluck('id'));
            }
        }

        $this->command->info('Создано ' . count($vacancies) . ' вакансий');
    }
}
