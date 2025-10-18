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

        if ($vacancies->count() < 10 || $resumes->count() < 10) {
            $this->command->warn('Недостаточно вакансий или резюме. Сначала запустите VacanciesSeeder и ResumesSeeder.');
            return;
        }

        $favorites = [];
        $targetCount = 50; // Целевое количество записей избранного
        $attempts = 0;
        $maxAttempts = 200; // Максимальное количество попыток

        // Создаем избранные связи между вакансиями и резюме
        while (count($favorites) < $targetCount && $attempts < $maxAttempts) {
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
                    'created_at' => now()->subDays(rand(0, 30)), // Случайная дата в последние 30 дней
                    'updated_at' => now()->subDays(rand(0, 30)),
                ];
            }
            
            $attempts++;
        }

        // Вставляем все записи одним запросом
        Favorite::insert($favorites);

        $this->command->info('Создано ' . count($favorites) . ' записей избранного');
    }
}
