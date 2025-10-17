<?php

namespace Database\Seeders;

use App\Models\Resume;
use App\Models\User;
use App\Models\Professions;
use App\Models\Skills;
use Illuminate\Database\Seeder;

class ResumesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Получаем пользователей и профессии
        $users = User::where('role', 2)->take(2)->get(); // 2 = JOB_SEEKER
        $professions = Professions::all(); // Берем все профессии
        $skills = Skills::take(15)->get();

        if ($users->count() < 2 || $professions->count() < 3) {
            $this->command->warn('Недостаточно пользователей или профессий. Сначала запустите UsersSeeder и ProfessionsSeeder.');
            return;
        }

        $resumes = [
            [
                'user_id' => $users[0]->id,
                'date_of_birth' => '1990-05-15',
                'city' => 'Москва',
                'country' => 'Россия',
                'education' => 'Высшее',
                'phone' => '+7 (999) 123-45-67',
                'about' => 'Опытный PHP разработчик с 5-летним стажем. Специализируюсь на Laravel, работал с крупными проектами. Знаю JavaScript, Vue.js, MySQL. Готов к новым вызовам и профессиональному росту.',
                'profession_id' => $professions[0]->id, // Программист
                'salary' => 150000,
                'status' => true,
            ],
            [
                'user_id' => $users[1]->id,
                'date_of_birth' => '1985-08-22',
                'city' => 'Санкт-Петербург',
                'country' => 'Россия',
                'education' => 'Высшее',
                'phone' => '+7 (812) 987-65-43',
                'about' => 'Менеджер по продажам с опытом работы в медицинской сфере. Успешно закрываю сделки, работаю с крупными клиентами. Знаю CRM системы, умею проводить презентации и работать с возражениями.',
                'profession_id' => $professions[1]->id, // Менеджер по продажам
                'salary' => 100000,
                'status' => true,
            ],
            [
                'user_id' => $users[1]->id, // Второе резюме для второго пользователя
                'date_of_birth' => '1992-03-10',
                'city' => 'Новосибирск',
                'country' => 'Россия',
                'education' => 'Высшее',
                'phone' => '+7 (383) 456-78-90',
                'about' => 'Аналитик данных с опытом работы в IT-компаниях. Специализируюсь на Python, R, SQL, машинном обучении. Умею работать с большими данными и создавать дашборды.',
                'profession_id' => $professions[8]->id, // Аналитик данных
                'salary' => 80000,
                'status' => false,
            ]
        ];

        foreach ($resumes as $resumeData) {
            $resume = Resume::create($resumeData);
            
            // Привязываем случайные навыки к резюме
            if ($skills->count() > 0) {
                $randomSkills = $skills->random(rand(5, min(10, $skills->count())));
                $resume->skills()->sync($randomSkills->pluck('id'));
            }
        }

        $this->command->info('Создано ' . count($resumes) . ' резюме');
    }
}
