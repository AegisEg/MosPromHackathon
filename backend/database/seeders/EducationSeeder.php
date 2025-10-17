<?php

namespace Database\Seeders;

use App\Models\Education;
use App\Models\Resume;
use Illuminate\Database\Seeder;

class EducationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Получаем резюме
        $resumes = Resume::take(3)->get();

        if ($resumes->count() < 3) {
            $this->command->warn('Недостаточно резюме. Сначала запустите ResumesSeeder.');
            return;
        }

        $educations = [
            // Образование для первого резюме (программист)
            [
                'resume_id' => $resumes[0]->id,
                'institution_name' => 'Московский государственный университет им. М.В. Ломоносова',
                'degree' => 'Бакалавр',
                'specialization' => 'Прикладная математика и информатика',
                'start_date' => '2008-09-01',
                'end_date' => '2012-06-30',
            ],
            [
                'resume_id' => $resumes[0]->id,
                'institution_name' => 'Московский государственный университет им. M.В. Ломоносова',
                'degree' => 'Магистр',
                'specialization' => 'Программная инженерия',
                'start_date' => '2012-09-01',
                'end_date' => '2014-06-30',
            ],

            // Образование для второго резюме (менеджер по продажам)
            [
                'resume_id' => $resumes[1]->id,
                'institution_name' => 'Санкт-Петербургский государственный университет',
                'degree' => 'Бакалавр',
                'specialization' => 'Менеджмент',
                'start_date' => '2003-09-01',
                'end_date' => '2007-06-30',
            ],
            [
                'resume_id' => $resumes[1]->id,
                'institution_name' => 'Санкт-Петербургский государственный университет',
                'degree' => 'Магистр',
                'specialization' => 'Маркетинг и продажи',
                'start_date' => '2007-09-01',
                'end_date' => '2009-06-30',
            ],

            // Образование для третьего резюме (маркетолог)
            [
                'resume_id' => $resumes[2]->id,
                'institution_name' => 'Московский государственный университет им. M.В. Ломоносова',
                'degree' => 'Бакалавр',
                'specialization' => 'Прикладная математика и информатика',
                'start_date' => '2008-09-01',
                'end_date' => '2012-06-30',
            ],
            [
                'resume_id' => $resumes[2]->id,
                'institution_name' => 'Высшая школа экономики',
                'degree' => 'Магистр',
                'specialization' => 'Маркетинг и реклама',
                'start_date' => '2012-09-01',
                'end_date' => '2014-06-30',
            ]
        ];

        foreach ($educations as $educationData) {
            Education::create($educationData);
        }

        $this->command->info('Создано ' . count($educations) . ' записей об образовании');
    }
}
