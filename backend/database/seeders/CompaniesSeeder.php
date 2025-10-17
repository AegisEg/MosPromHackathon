<?php

namespace Database\Seeders;

use App\Models\Companies;
use App\Models\User;
use App\Models\Industries;
use Illuminate\Database\Seeder;

class CompaniesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Получаем пользователей-работодателей для создания компаний
        $users = User::where('role', 1)->take(3)->get(); // 1 = EMPLOYER
        
        if ($users->count() < 3) {
            $this->command->warn('Недостаточно пользователей для создания компаний. Сначала запустите UsersSeeder.');
            return;
        }

        // Получаем отрасли
        $industries = Industries::take(3)->get();

        $companies = [
            [
                'user_id' => $users[0]->id,
                'name' => 'ООО "ТехноСофт"',
                'description' => 'Разработка программного обеспечения и IT-решений для бизнеса. Специализируемся на веб-разработке, мобильных приложениях и системной интеграции.',
                'website' => 'https://technosoft.ru',
                'size' => '50-100',
                'city' => 'Москва',
                'country' => 'Россия',
                'logo_url' => 'https://example.com/logos/technosoft.png'
            ],
            [
                'user_id' => $users[1]->id,
                'name' => 'АО "Медицинские технологии"',
                'description' => 'Производство и поставка медицинского оборудования. Инновационные решения для здравоохранения и диагностики.',
                'website' => 'https://medtech.ru',
                'size' => '200-500',
                'city' => 'Санкт-Петербург',
                'country' => 'Россия',
                'logo_url' => 'https://example.com/logos/medtech.png'
            ],
            [
                'user_id' => $users[2]->id,
                'name' => 'ИП "Консалтинг Плюс"',
                'description' => 'Консалтинговые услуги в области управления персоналом, бизнес-аналитики и стратегического планирования.',
                'website' => 'https://consulting-plus.ru',
                'size' => '10-50',
                'city' => 'Екатеринбург',
                'country' => 'Россия',
                'logo_url' => 'https://example.com/logos/consulting.png'
            ]
        ];

        foreach ($companies as $companyData) {
            $company = Companies::create($companyData);
            
            // Привязываем случайные отрасли к компании
            if ($industries->count() > 0) {
                $randomIndustries = $industries->random(rand(1, min(2, $industries->count())));
                $company->industries()->sync($randomIndustries->pluck('id'));
            }
        }

        $this->command->info('Создано ' . count($companies) . ' компаний');
    }
}
