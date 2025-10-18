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
        $users = User::where('role', 1)->take(20)->get(); // 1 = EMPLOYER
        
        if ($users->count() < 20) {
            $this->command->warn('Недостаточно пользователей для создания компаний. Сначала запустите UsersSeeder.');
            return;
        }

        // Получаем отрасли
        $industries = Industries::all();

        $companies = [
            [
                'user_id' => $users[0]->id,
                'name' => 'ООО "ТехноСофт"',
                'description' => 'Разработка программного обеспечения и IT-решений для бизнеса. Специализируемся на веб-разработке, мобильных приложениях и системной интеграции.',
                'website' => 'https://technosoft.ru',
                'size' => 120,
                'city' => 'Москва',
                'country' => 'Россия',
                'logo_url' => 'https://example.com/logos/technosoft.png'
            ],
            [
                'user_id' => $users[1]->id,
                'name' => 'АО "Медицинские технологии"',
                'description' => 'Производство и поставка медицинского оборудования. Инновационные решения для здравоохранения и диагностики.',
                'website' => 'https://medtech.ru',
                'size' => 4000,
                'city' => 'Санкт-Петербург',
                'country' => 'Россия',
                'logo_url' => 'https://example.com/logos/medtech.png'
            ],
            [
                'user_id' => $users[2]->id,
                'name' => 'ИП "Консалтинг Плюс"',
                'description' => 'Консалтинговые услуги в области управления персоналом, бизнес-аналитики и стратегического планирования.',
                'website' => 'https://consulting-plus.ru',
                'size' => 59,
                'city' => 'Екатеринбург',
                'country' => 'Россия',
                'logo_url' => 'https://example.com/logos/consulting.png'
            ],
            [
                'user_id' => $users[3]->id,
                'name' => 'ПАО "СберБанк"',
                'description' => 'Крупнейший универсальный банк России. Оказываем полный спектр банковских услуг физическим и юридическим лицам.',
                'website' => 'https://sberbank.ru',
                'size' => 250000,
                'city' => 'Москва',
                'country' => 'Россия',
                'logo_url' => 'https://example.com/logos/sber.png'
            ],
            [
                'user_id' => $users[4]->id,
                'name' => 'ООО "Лаборатория Касперского"',
                'description' => 'Ведущий международный разработчик решений в области информационной безопасности и защиты от киберугроз.',
                'website' => 'https://kaspersky.ru',
                'size' => 4000,
                'city' => 'Москва',
                'country' => 'Россия',
                'logo_url' => 'https://example.com/logos/kaspersky.png'
            ],
            [
                'user_id' => $users[5]->id,
                'name' => 'ООО "Яндекс"',
                'description' => 'Технологическая компания, специализирующаяся на интернет-сервисах и продуктах на основе машинного обучения.',
                'website' => 'https://yandex.ru',
                'size' => 18000,
                'city' => 'Москва',
                'country' => 'Россия',
                'logo_url' => 'https://example.com/logos/yandex.png'
            ],
            [
                'user_id' => $users[6]->id,
                'name' => 'ООО "Ситимобил"',
                'description' => 'Сервис заказа такси и доставки. Современные технологии для комфортных поездок.',
                'website' => 'https://city-mobil.ru',
                'size' => 5000,
                'city' => 'Москва',
                'country' => 'Россия',
                'logo_url' => 'https://example.com/logos/citymobil.png'
            ],
            [
                'user_id' => $users[7]->id,
                'name' => 'ООО "Мегафон"',
                'description' => 'Один из ведущих телекоммуникационных операторов России. Предоставляем услуги сотовой связи и интернета.',
                'website' => 'https://megafon.ru',
                'size' => 30000,
                'city' => 'Москва',
                'country' => 'Россия',
                'logo_url' => 'https://example.com/logos/megafon.png'
            ],
            [
                'user_id' => $users[8]->id,
                'name' => 'ООО "Альфа-Банк"',
                'description' => 'Крупнейший частный банк России. Предоставляем широкий спектр финансовых услуг.',
                'website' => 'https://alfabank.ru',
                'size' => 35000,
                'city' => 'Москва',
                'country' => 'Россия',
                'logo_url' => 'https://example.com/logos/alfabank.png'
            ],
            [
                'user_id' => $users[9]->id,
                'name' => 'ООО "СДЭК"',
                'description' => 'Транспортно-логистическая компания, специализирующаяся на экспресс-доставке грузов и посылок.',
                'website' => 'https://cdek.ru',
                'size' => 15000,
                'city' => 'Новосибирск',
                'country' => 'Россия',
                'logo_url' => 'https://example.com/logos/cdek.png'
            ],
            [
                'user_id' => $users[10]->id,
                'name' => 'ООО "ВкусВилл"',
                'description' => 'Федеральная сеть магазинов натуральных продуктов. Качественные и полезные продукты для всей семьи.',
                'website' => 'https://vkusvill.ru',
                'size' => 20000,
                'city' => 'Москва',
                'country' => 'Россия',
                'logo_url' => 'https://example.com/logos/vkusvill.png'
            ],
            [
                'user_id' => $users[11]->id,
                'name' => 'ООО "Ozon"',
                'description' => 'Крупнейшая российская площадка электронной коммерции. Миллионы товаров с доставкой по всей России.',
                'website' => 'https://ozon.ru',
                'size' => 35000,
                'city' => 'Москва',
                'country' => 'Россия',
                'logo_url' => 'https://example.com/logos/ozon.png'
            ],
            [
                'user_id' => $users[12]->id,
                'name' => 'ООО "Wildberries"',
                'description' => 'Крупнейший онлайн-ритейлер России. Огромный ассортимент товаров по доступным ценам.',
                'website' => 'https://wildberries.ru',
                'size' => 50000,
                'city' => 'Москва',
                'country' => 'Россия',
                'logo_url' => 'https://example.com/logos/wb.png'
            ],
            [
                'user_id' => $users[13]->id,
                'name' => 'ООО "HeadHunter"',
                'description' => 'Ведущий онлайн-сервис по поиску работы и подбору персонала в России.',
                'website' => 'https://hh.ru',
                'size' => 3000,
                'city' => 'Москва',
                'country' => 'Россия',
                'logo_url' => 'https://example.com/logos/hh.png'
            ],
            [
                'user_id' => $users[14]->id,
                'name' => 'ООО "Skillbox"',
                'description' => 'Образовательная онлайн-платформа. Курсы и программы обучения по востребованным профессиям.',
                'website' => 'https://skillbox.ru',
                'size' => 1500,
                'city' => 'Москва',
                'country' => 'Россия',
                'logo_url' => 'https://example.com/logos/skillbox.png'
            ],
            [
                'user_id' => $users[15]->id,
                'name' => 'ООО "Авито"',
                'description' => 'Крупнейшая площадка объявлений в России. Продажа товаров, услуг, вакансий и недвижимости.',
                'website' => 'https://avito.ru',
                'size' => 6000,
                'city' => 'Москва',
                'country' => 'Россия',
                'logo_url' => 'https://example.com/logos/avito.png'
            ],
            [
                'user_id' => $users[16]->id,
                'name' => 'ООО "Ростелеком"',
                'description' => 'Крупнейший российский оператор цифровых услуг и решений, присутствующий во всех сегментах рынка.',
                'website' => 'https://rostelecom.ru',
                'size' => 100000,
                'city' => 'Москва',
                'country' => 'Россия',
                'logo_url' => 'https://example.com/logos/rostelecom.png'
            ],
            [
                'user_id' => $users[17]->id,
                'name' => 'ООО "Тинькофф"',
                'description' => 'Финансовая экосистема и онлайн-банк. Инновационные банковские и страховые услуги.',
                'website' => 'https://tinkoff.ru',
                'size' => 45000,
                'city' => 'Москва',
                'country' => 'Россия',
                'logo_url' => 'https://example.com/logos/tinkoff.png'
            ],
            [
                'user_id' => $users[18]->id,
                'name' => 'ООО "X5 Group"',
                'description' => 'Ведущая продуктовая розничная компания России, управляющая сетями Пятёрочка, Перекрёсток и Чижик.',
                'website' => 'https://x5.ru',
                'size' => 300000,
                'city' => 'Москва',
                'country' => 'Россия',
                'logo_url' => 'https://example.com/logos/x5.png'
            ],
            [
                'user_id' => $users[19]->id,
                'name' => 'ООО "VK"',
                'description' => 'Технологическая компания, создающая сервисы для общения, развлечений и работы.',
                'website' => 'https://vk.company',
                'size' => 12000,
                'city' => 'Москва',
                'country' => 'Россия',
                'logo_url' => 'https://example.com/logos/vk.png'
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

        $this->command->info('Создано ' . count($companies) . ' компаний (20 компаний)');
    }
}
