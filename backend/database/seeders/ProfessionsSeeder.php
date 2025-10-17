<?php

namespace Database\Seeders;

use App\Models\Professions;
use Illuminate\Database\Seeder;

class ProfessionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $professions = [
            'Программист',
            'Менеджер по продажам',
            'Врач',
            'Учитель',
            'Инженер',
            'Маркетолог',
            'Бухгалтер',
            'Дизайнер',
            'Аналитик данных',
            'HR-менеджер'
        ];

        foreach ($professions as $profession) {
            Professions::create([
                'name' => $profession
            ]);
        }
    }
}
