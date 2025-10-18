<?php
declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Industries;
use App\Models\User;
use App\Enums\UserRole;
use Illuminate\Database\Seeder;

class IndustriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $industries = [
            'Информационные технологии',
            'Финансы и банковское дело',
            'Здравоохранение и медицина',
            'Образование и наука',
            'Производство и промышленность',
            'Торговля и ритейл',
            'Строительство и недвижимость',
            'Транспорт и логистика',
            'Маркетинг и реклама',
            'Консалтинг и аудит',
        ];

        // Берём пользователей с ролью INSTITUTE для привязки к индустриям (институтам)
        $instituteUserIds = User::query()->where('role', UserRole::INSTITUTE)->pluck('id')->all();

        foreach ($industries as $industry) {
            Industries::create([
                'name'    => $industry,
                'user_id' => !empty($instituteUserIds) ? $instituteUserIds[array_rand($instituteUserIds)] : null,
            ]);
        }
    }
}
