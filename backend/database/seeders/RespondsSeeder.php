<?php
declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Responds;
use App\Models\Vacancies;
use App\Models\Resume;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RespondsSeeder extends Seeder
{
    public function run(): void {
        $vacancyIds = Vacancies::query()->pluck('id')->all();
        $resumeIds  = Resume::query()->pluck('id')->all();

        if (empty($vacancyIds) || empty($resumeIds)) {
            return;
        }

        DB::transaction(function () use ($vacancyIds, $resumeIds) {
            // Создаем 50 существующих откликов
            for ($i = 0; $i < 50; $i++) {
                Responds::create([
                    'vacancy_id' => $vacancyIds[array_rand($vacancyIds)],
                    'resume_id'  => $resumeIds[array_rand($resumeIds)],
                    'status'     => 0,
                    'message'    => fake()->boolean(60) ? fake()->sentence(12) : null,
                ]);
            }
            
            // Создаем 20 новых откликов, привязанных к вакансии с id=1
            if (in_array(1, $vacancyIds)) {
                for ($i = 0; $i < 20; $i++) {
                    Responds::create([
                        'vacancy_id' => 1,
                        'resume_id'  => $resumeIds[array_rand($resumeIds)],
                        'status'     => rand(0, 2), // Случайный статус от 0 до 2
                        'message'    => fake()->boolean(70) ? fake()->sentence(rand(8, 20)) : null,
                    ]);
                }
            }
            
            // Создаем 50 откликов от программистов к вакансии с id=1
            // Берем последние 50 резюме (это резюме программистов)
            $programmerResumeIds = array_slice($resumeIds, -50);
            if (in_array(1, $vacancyIds) && count($programmerResumeIds) > 0) {
                for ($i = 0; $i < 50; $i++) {
                    Responds::create([
                        'vacancy_id' => 1,
                        'resume_id'  => $programmerResumeIds[array_rand($programmerResumeIds)],
                        'status'     => rand(0, 2), // Случайный статус от 0 до 2
                        'message'    => fake()->boolean(80) ? fake()->sentence(rand(10, 25)) : null,
                    ]);
                }
            }
            
            // Создаем еще 20 новых откликов с случайными вакансиями
            for ($i = 0; $i < 20; $i++) {
                Responds::create([
                    'vacancy_id' => $vacancyIds[array_rand($vacancyIds)],
                    'resume_id'  => $resumeIds[array_rand($resumeIds)],
                    'status'     => rand(0, 2), // Случайный статус от 0 до 2
                    'message'    => fake()->boolean(65) ? fake()->sentence(rand(6, 18)) : null,
                ]);
            }
        });
    }
}
