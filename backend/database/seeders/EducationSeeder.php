<?php

namespace Database\Seeders;

use App\Models\Education;
use App\Models\Resume;
use App\Models\Professions;
use Illuminate\Database\Seeder;

class EducationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Получаем все резюме с их профессиями
        $resumes = Resume::with('profession')->get();

        if ($resumes->count() == 0) {
            $this->command->warn('Нет резюме. Сначала запустите ResumesSeeder.');
            return;
        }

        // База данных образовательных учреждений
        $institutions = [
            'Московский государственный университет им. М.В. Ломоносова',
            'Санкт-Петербургский государственный университет',
            'Высшая школа экономики',
            'Московский физико-технический институт',
            'Московский государственный технический университет им. Н.Э. Баумана',
            'Санкт-Петербургский политехнический университет Петра Великого',
            'Новосибирский государственный университет',
            'Уральский федеральный университет',
            'Казанский федеральный университет',
            'Нижегородский государственный университет им. Н.И. Лобачевского',
            'Российский экономический университет им. Г.В. Плеханова',
            'Московский государственный институт международных отношений',
            'Финансовый университет при Правительстве РФ',
            'Российский университет дружбы народов',
            'Московский государственный лингвистический университет',
            'Санкт-Петербургский государственный экономический университет',
            'Московский государственный университет технологий и управления',
            'Российский государственный гуманитарный университет',
            'Московский педагогический государственный университет',
            'Санкт-Петербургский государственный университет промышленных технологий и дизайна'
        ];

        // Специализации по профессиям
        $specializationsByProfession = [
            'Программист' => [
                ['degree' => 'Бакалавр', 'specialization' => 'Прикладная математика и информатика'],
                ['degree' => 'Бакалавр', 'specialization' => 'Программная инженерия'],
                ['degree' => 'Бакалавр', 'specialization' => 'Информатика и вычислительная техника'],
                ['degree' => 'Бакалавр', 'specialization' => 'Информационные системы и технологии'],
                ['degree' => 'Магистр', 'specialization' => 'Программная инженерия'],
                ['degree' => 'Магистр', 'specialization' => 'Информационные технологии'],
                ['degree' => 'Магистр', 'specialization' => 'Кибербезопасность'],
                ['degree' => 'Специалист', 'specialization' => 'Прикладная математика и информатика'],
            ],
            'Менеджер по продажам' => [
                ['degree' => 'Бакалавр', 'specialization' => 'Менеджмент'],
                ['degree' => 'Бакалавр', 'specialization' => 'Управление персоналом'],
                ['degree' => 'Бакалавр', 'specialization' => 'Торговое дело'],
                ['degree' => 'Бакалавр', 'specialization' => 'Маркетинг'],
                ['degree' => 'Магистр', 'specialization' => 'Стратегический менеджмент'],
                ['degree' => 'Магистр', 'specialization' => 'Управление проектами'],
                ['degree' => 'Магистр', 'specialization' => 'Маркетинг и продажи'],
            ],
            'Маркетолог' => [
                ['degree' => 'Бакалавр', 'specialization' => 'Маркетинг'],
                ['degree' => 'Бакалавр', 'specialization' => 'Реклама и связи с общественностью'],
                ['degree' => 'Бакалавр', 'specialization' => 'Торговое дело'],
                ['degree' => 'Магистр', 'specialization' => 'Маркетинг и реклама'],
                ['degree' => 'Магистр', 'specialization' => 'Цифровой маркетинг'],
                ['degree' => 'Магистр', 'specialization' => 'Бренд-менеджмент'],
            ],
            'Бухгалтер' => [
                ['degree' => 'Бакалавр', 'specialization' => 'Бухгалтерский учет, анализ и аудит'],
                ['degree' => 'Бакалавр', 'specialization' => 'Экономика'],
                ['degree' => 'Бакалавр', 'specialization' => 'Финансы и кредит'],
                ['degree' => 'Магистр', 'specialization' => 'Экономика'],
                ['degree' => 'Магистр', 'specialization' => 'Финансы'],
                ['degree' => 'Специалист', 'specialization' => 'Бухгалтерский учет, анализ и аудит'],
            ],
            'Дизайнер' => [
                ['degree' => 'Бакалавр', 'specialization' => 'Дизайн'],
                ['degree' => 'Бакалавр', 'specialization' => 'Графический дизайн'],
                ['degree' => 'Бакалавр', 'specialization' => 'Дизайн архитектурной среды'],
                ['degree' => 'Магистр', 'specialization' => 'Дизайн'],
                ['degree' => 'Магистр', 'specialization' => 'Коммуникативный дизайн'],
                ['degree' => 'Специалист', 'specialization' => 'Дизайн'],
            ],
            'Врач' => [
                ['degree' => 'Специалист', 'specialization' => 'Лечебное дело'],
                ['degree' => 'Специалист', 'specialization' => 'Педиатрия'],
                ['degree' => 'Специалист', 'specialization' => 'Стоматология'],
                ['degree' => 'Магистр', 'specialization' => 'Общественное здравоохранение'],
            ],
            'Учитель' => [
                ['degree' => 'Бакалавр', 'specialization' => 'Педагогическое образование'],
                ['degree' => 'Бакалавр', 'specialization' => 'Психолого-педагогическое образование'],
                ['degree' => 'Магистр', 'specialization' => 'Педагогическое образование'],
                ['degree' => 'Специалист', 'specialization' => 'Педагогика и методика начального образования'],
            ],
            'Инженер' => [
                ['degree' => 'Бакалавр', 'specialization' => 'Техносферная безопасность'],
                ['degree' => 'Бакалавр', 'specialization' => 'Строительство'],
                ['degree' => 'Бакалавр', 'specialization' => 'Машиностроение'],
                ['degree' => 'Магистр', 'specialization' => 'Техносферная безопасность'],
                ['degree' => 'Магистр', 'specialization' => 'Строительство'],
                ['degree' => 'Специалист', 'specialization' => 'Промышленное и гражданское строительство'],
            ],
            'Аналитик данных' => [
                ['degree' => 'Бакалавр', 'specialization' => 'Прикладная математика и информатика'],
                ['degree' => 'Бакалавр', 'specialization' => 'Статистика'],
                ['degree' => 'Бакалавр', 'specialization' => 'Экономика'],
                ['degree' => 'Магистр', 'specialization' => 'Прикладная математика и информатика'],
                ['degree' => 'Магистр', 'specialization' => 'Статистика'],
                ['degree' => 'Магистр', 'specialization' => 'Экономика'],
            ],
            'HR-менеджер' => [
                ['degree' => 'Бакалавр', 'specialization' => 'Психология'],
                ['degree' => 'Бакалавр', 'specialization' => 'Управление персоналом'],
                ['degree' => 'Бакалавр', 'specialization' => 'Менеджмент'],
                ['degree' => 'Магистр', 'specialization' => 'Психология'],
                ['degree' => 'Магистр', 'specialization' => 'Управление персоналом'],
                ['degree' => 'Магистр', 'specialization' => 'Организационная психология'],
            ],
        ];

        // Общие специальности для неизвестных профессий
        $generalSpecializations = [
            ['degree' => 'Бакалавр', 'specialization' => 'Экономика'],
            ['degree' => 'Бакалавр', 'specialization' => 'Менеджмент'],
            ['degree' => 'Бакалавр', 'specialization' => 'Социология'],
            ['degree' => 'Бакалавр', 'specialization' => 'Психология'],
            ['degree' => 'Бакалавр', 'specialization' => 'Журналистика'],
            ['degree' => 'Магистр', 'specialization' => 'Экономика'],
            ['degree' => 'Магистр', 'specialization' => 'Менеджмент'],
            ['degree' => 'Магистр', 'specialization' => 'Социология'],
            ['degree' => 'Специалист', 'specialization' => 'Экономика'],
        ];

        $totalEducations = 0;

        foreach ($resumes as $resume) {
            // Определяем количество образований для резюме (1-3)
            $educationCount = rand(1, 3);
            
            // Получаем специальности для профессии или общие
            $professionName = $resume->profession ? $resume->profession->name : null;
            $availableSpecializations = $specializationsByProfession[$professionName] ?? $generalSpecializations;
            
            // Создаем образования для резюме
            for ($i = 0; $i < $educationCount; $i++) {
                $specialization = $availableSpecializations[array_rand($availableSpecializations)];
                $institution = $institutions[array_rand($institutions)];
                
                // Генерируем даты обучения
                $startYear = rand(2000, 2020);
                $startMonth = rand(8, 9); // Сентябрь или август
                $startDate = sprintf('%04d-%02d-01', $startYear, $startMonth);
                
                // Продолжительность обучения зависит от степени
                $duration = match($specialization['degree']) {
                    'Бакалавр' => 4,
                    'Магистр' => 2,
                    'Специалист' => 5,
                    default => 4
                };
                
                $endYear = $startYear + $duration;
                $endMonth = rand(5, 6); // Май или июнь
                $endDate = sprintf('%04d-%02d-30', $endYear, $endMonth);
                
                // Для магистратуры и второго образования корректируем даты
                if ($i > 0) {
                    $startYear = rand(2010, 2022);
                    $startDate = sprintf('%04d-%02d-01', $startYear, $startMonth);
                    $endYear = $startYear + $duration;
                    $endDate = sprintf('%04d-%02d-30', $endYear, $endMonth);
                }
                
                Education::create([
                    'resume_id' => $resume->id,
                    'institution_name' => $institution,
                    'degree' => $specialization['degree'],
                    'specialization' => $specialization['specialization'],
                    'start_date' => $startDate,
                    'end_date' => $endDate,
                ]);
                
                $totalEducations++;
            }
        }

        $this->command->info("Создано {$totalEducations} записей об образовании для {$resumes->count()} резюме");
    }
}
