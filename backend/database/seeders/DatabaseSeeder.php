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

            // Резюме и связанные данные
            ResumesSeeder::class,
            ExperiencesSeeder::class,
            EducationSeeder::class,

            // Вакансии
            VacanciesSeeder::class,

            // Стажировки
            InternshipsSeeder::class,

            // Отклики, чаты и сообщения
            RespondsSeeder::class,
            ChatsSeeder::class,
            ChatMessagesSeeder::class,
            ChatMessageFilesSeeder::class,
        ]);
    }
}
