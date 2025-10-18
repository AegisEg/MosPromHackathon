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
            for ($i = 0; $i < 50; $i++) {
                Responds::create([
                    'vacancy_id' => $vacancyIds[array_rand($vacancyIds)],
                    'resume_id'  => $resumeIds[array_rand($resumeIds)],
                    'status'     => 0,
                    'message'    => fake()->boolean(60) ? fake()->sentence(12) : null,
                ]);
            }
        });
    }
}
