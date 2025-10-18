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
        $users = User::where('role', 2)->get(); // 2 = JOB_SEEKER - берем всех соискателей
        $professions = Professions::all(); // Берем все профессии
        $skills = Skills::take(15)->get();

        if ($users->count() < 10 || $professions->count() < 3) {
            $this->command->warn('Недостаточно пользователей или профессий. Сначала запустите UsersSeeder и ProfessionsSeeder.');
            return;
        }

        $cities = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань', 'Нижний Новгород', 'Челябинск', 'Самара', 'Омск', 'Ростов-на-Дону'];
        $educations = ['Высшее', 'Неполное высшее', 'Среднее специальное', 'Среднее'];
        $aboutTexts = [
            'Опытный специалист с многолетним стажем работы. Ответственный, коммуникабельный, готов к обучению и профессиональному росту.',
            'Мотивированный сотрудник с хорошими аналитическими способностями. Умею работать в команде и самостоятельно принимать решения.',
            'Креативный подход к решению задач, опыт работы с клиентами. Готов к переезду и командировкам.',
            'Технически подкованный специалист с опытом работы в различных сферах. Быстро обучаюсь новым технологиям.',
            'Опыт работы в крупных компаниях, знание современных инструментов и методологий. Лидерские качества и опыт управления командой.'
        ];

        $resumes = [];
        $resumeCount = min(25, $users->count()); // Создаем до 25 резюме

        for ($i = 0; $i < $resumeCount; $i++) {
            $user = $users[$i % $users->count()];
            $profession = $professions->random();
            $city = $cities[array_rand($cities)];
            $education = $educations[array_rand($educations)];
            $about = $aboutTexts[array_rand($aboutTexts)];
            
            // Генерируем случайную дату рождения (от 18 до 65 лет)
            $age = rand(18, 65);
            $birthYear = date('Y') - $age;
            $birthMonth = rand(1, 12);
            $birthDay = rand(1, 28);
            $dateOfBirth = sprintf('%04d-%02d-%02d', $birthYear, $birthMonth, $birthDay);
            
            // Генерируем случайный телефон
            $phone = '+7 (' . rand(900, 999) . ') ' . rand(100, 999) . '-' . rand(10, 99) . '-' . rand(10, 99);
            
            // Генерируем случайную зарплату в зависимости от профессии
            $baseSalary = rand(40000, 200000);
            $salary = round($baseSalary / 1000) * 1000; // Округляем до тысяч
            
            $resumes[] = [
                'user_id' => $user->id,
                'date_of_birth' => $dateOfBirth,
                'city' => $city,
                'country' => 'Россия',
                'education' => $education,
                'phone' => $phone,
                'about' => $about,
                'profession_id' => $profession->id,
                'salary' => $salary,
                'status' => rand(0, 1) == 1, // Случайный статус
            ];
        }

        foreach ($resumes as $resumeData) {
            $resume = Resume::create($resumeData);
            
            // Привязываем случайные навыки к резюме
            if ($skills->count() > 0) {
                $randomSkills = $skills->random(rand(3, min(8, $skills->count())));
                $resume->skills()->sync($randomSkills->pluck('id'));
            }
        }

        $this->command->info('Создано ' . count($resumes) . ' резюме');
    }
}
