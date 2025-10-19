<?php
declare(strict_types=1);

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void {
        $this->call([
            // Базовые справочники
            IndustriesSeeder::class,
            ProfessionsSeeder::class,
            SkillsSeeder::class,

            // Пользователи и компании
            UsersSeeder::class,
            CompaniesSeeder::class,
            InstitutesSeeder::class,

            // Резюме и связанные данные
            ResumesSeeder::class,
            ExperiencesSeeder::class,
            EducationSeeder::class,

            // Вакансии
            VacanciesSeeder::class,

            // Избранное (связи вакансий с резюме)
            FavoritesSeeder::class,

            // Стажировки
            InternshipsSeeder::class,
            InternshipRespondsSeeder::class,

            // Отклики, чаты и сообщения
            RespondsSeeder::class,
            // Чаты и сообщения
            // ChatsSeeder::class,
            // // Сообщения чата
            // ChatMessagesSeeder::class,
            // // Файлы сообщений чата
            // ChatMessageFilesSeeder::class,
        ]);
    }
}
