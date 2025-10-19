<?php
declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Internship;
use App\Models\Institute;
use Illuminate\Database\Seeder;

class InternshipsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void {
        // Институты
        $institutes = Institute::all();

        if ($institutes->isEmpty()) {
            $this->command->warn('Нет институтов для создания стажировок. Сначала запустите UsersSeeder и InstitutesSeeder.');

            return;
        }

        $internships = [
            [
                'speciality'        => 'Веб-разработка',
                'count_students'    => 15,
                'start_date_period' => '2024-01-15',
                'end_date_period'   => '2024-03-15',
            ],
            [
                'speciality'        => 'Мобильная разработка',
                'count_students'    => 12,
                'start_date_period' => '2024-02-01',
                'end_date_period'   => '2024-04-01',
            ],
            [
                'speciality'        => 'Data Science',
                'count_students'    => 10,
                'start_date_period' => '2024-01-20',
                'end_date_period'   => '2024-03-20',
            ],
            [
                'speciality'        => 'DevOps',
                'count_students'    => 8,
                'start_date_period' => '2024-02-15',
                'end_date_period'   => '2024-04-15',
            ],
            [
                'speciality'        => 'UI/UX дизайн',
                'count_students'    => 20,
                'start_date_period' => '2024-01-10',
                'end_date_period'   => '2024-03-10',
            ],
            [
                'speciality'        => 'Кибербезопасность',
                'count_students'    => 6,
                'start_date_period' => '2024-02-20',
                'end_date_period'   => '2024-04-20',
            ],
            [
                'speciality'        => 'Машинное обучение',
                'count_students'    => 14,
                'start_date_period' => '2024-01-25',
                'end_date_period'   => '2024-03-25',
            ],
            [
                'speciality'        => 'Backend разработка',
                'count_students'    => 18,
                'start_date_period' => '2024-02-05',
                'end_date_period'   => '2024-04-05',
            ],
        ];

        foreach ($internships as $internshipData) {
            $institute = $institutes->random();

            Internship::create([
                'institute_id'      => $institute->id,
                'speciality'        => $internshipData['speciality'],
                'count_students'    => $internshipData['count_students'],
                'start_date_period' => $internshipData['start_date_period'],
                'end_date_period'   => $internshipData['end_date_period'],
            ]);
        }

        $this->command->info('Создано ' . count($internships) . ' стажировок.');
    }
}
