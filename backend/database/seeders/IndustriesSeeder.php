<?php

namespace Database\Seeders;

use App\Models\Industries;
use Illuminate\Database\Seeder;

class IndustriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
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
            'Консалтинг и аудит'
        ];

        foreach ($industries as $industry) {
            Industries::create([
                'name' => $industry
            ]);
        }
    }
}
