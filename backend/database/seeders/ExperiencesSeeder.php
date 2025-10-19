<?php

namespace Database\Seeders;

use App\Models\Experiences;
use App\Models\Resume;
use Illuminate\Database\Seeder;

class ExperiencesSeeder extends Seeder
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

        $experiences = [
            // Опыт для первого резюме (программист)
            [
                'resume_id' => $resumes[0]->id,
                'company_name' => 'ООО "ВебСтудия"',
                'position' => 'PHP Developer',
                'start_date' => '2020-03-01',
                'end_date' => '2023-12-31',
                'description' => 'Разработка веб-приложений на Laravel. Работа с API, интеграция с внешними сервисами. Участие в code review, менторинг junior разработчиков.',
            ],
            [
                'resume_id' => $resumes[0]->id,
                'company_name' => 'ИП "ТехСервис"',
                'position' => 'Junior PHP Developer',
                'start_date' => '2019-06-01',
                'end_date' => '2020-02-28',
                'description' => 'Разработка небольших веб-сайтов, поддержка существующих проектов. Изучение Laravel, работа с MySQL, Git.',
            ],

            // Опыт для второго резюме (менеджер по продажам)
            [
                'resume_id' => $resumes[1]->id,
                'company_name' => 'ООО "МедТех"',
                'position' => 'Менеджер по продажам',
                'start_date' => '2021-01-15',
                'end_date' => '2024-01-15',
                'description' => 'Продажи медицинского оборудования клиникам и больницам. Ведение клиентской базы в CRM, проведение презентаций, работа с возражениями. Выполнение плана продаж на 120%.',
            ],
            [
                'resume_id' => $resumes[1]->id,
                'company_name' => 'АО "ФармаСервис"',
                'position' => 'Специалист по работе с клиентами',
                'start_date' => '2019-09-01',
                'end_date' => '2020-12-31',
                'description' => 'Консультирование клиентов по фармацевтической продукции. Обработка заявок, работа с документацией, поддержание долгосрочных отношений с клиентами.',
            ],

            // Опыт для третьего резюме (маркетолог)
            [
                'resume_id' => $resumes[2]->id,
                'company_name' => 'ООО "Дигитал Агентство"',
                'position' => 'SMM-менеджер',
                'start_date' => '2022-03-01',
                'end_date' => '2023-08-31',
                'description' => 'Ведение социальных сетей клиентов, создание контента, настройка рекламных кампаний. Аналитика и отчетность по результатам работы.',
            ],
            [
                'resume_id' => $resumes[2]->id,
                'company_name' => 'ООО "Дигитал Агентство"',
                'position' => 'SMM-менеджер',
                'start_date' => '2022-03-01',
                'end_date' => '2023-08-31',
                'description' => 'Ведение социальных сетей клиентов, создание контента, настройка рекламных кампаний. Аналитика и отчетность по результатам работы.',
            ],
        ];

        foreach ($experiences as $experienceData) {
            Experiences::create($experienceData);
        }

        $this->command->info('Создано ' . count($experiences) . ' записей об опыте работы');
    }
}
