<?php
declare(strict_types=1);

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\Institute;
use App\Models\User;
use Illuminate\Database\Seeder;

class InstitutesSeeder extends Seeder
{
    public function run(): void {
        // Берём всех пользователей с ролью INSTITUTE
        $users = User::query()->where('role', UserRole::INSTITUTE)->get();

        foreach ($users as $user) {
            // Имя института по умолчанию формируем из ФИО пользователя
            $defaultName = trim($user->last_name.' '.$user->first_name);

            Institute::firstOrCreate(
                ['user_id' => $user->id],
                ['name' => $defaultName !== '' ? $defaultName : 'Институт #'.$user->id],
            );
        }
    }
}
