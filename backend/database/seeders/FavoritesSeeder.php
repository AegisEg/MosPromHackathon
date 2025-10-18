<?php
declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Favorite;
use App\Models\Vacancies;
use App\Models\Resume;
use Illuminate\Database\Seeder;

class FavoritesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Получаем вакансии и резюме
        $vacancies = Vacancies::all();
        $resumes = Resume::all();

        if ($vacancies->count() < 5 || $resumes->count() < 3) {
            $this->command->warn('Недостаточно вакансий или резюме. Сначала запустите VacanciesSeeder и ResumesSeeder.');
            return;
        }

        $favorites = [];

        // Создаем избранные связи между вакансиями и резюме
        // Каждая вакансия может выбрать несколько резюме
        foreach ($vacancies->take(20) as $vacancy) {
            // Случайное количество резюме для каждой вакансии (от 1 до 3)
            $resumeCount = rand(1, min(3, $resumes->count()));
            $selectedResumes = $resumes->random($resumeCount);

            foreach ($selectedResumes as $resume) {
                $favorites[] = [
                    'vacancy_id' => $vacancy->id,
                    'resume_id' => $resume->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        // Добавляем дополнительные случайные связи
        for ($i = 0; $i < 15; $i++) {
            $vacancy = $vacancies->random();
            $resume = $resumes->random();

            // Проверяем, что такая связь еще не существует
            $exists = collect($favorites)->contains(function ($favorite) use ($vacancy, $resume) {
                return $favorite['vacancy_id'] === $vacancy->id && $favorite['resume_id'] === $resume->id;
            });

            if (!$exists) {
                $favorites[] = [
                    'vacancy_id' => $vacancy->id,
                    'resume_id' => $resume->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        // Вставляем все записи одним запросом
        Favorite::insert($favorites);

        $this->command->info('Создано ' . count($favorites) . ' записей избранного');
    }
}
