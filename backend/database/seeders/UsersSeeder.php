<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'first_name' => 'Александр',
                'last_name' => 'Петров',
                'middle_name' => 'Иванович',
                'email' => 'alexander.petrov@example.com',
                'password' => Hash::make('password123'),
                'role' => UserRole::EMPLOYER,
                'is_active' => true,
            ],
            [
                'first_name' => 'Мария',
                'last_name' => 'Сидорова',
                'middle_name' => 'Сергеевна',
                'email' => 'maria.sidorova@example.com',
                'password' => Hash::make('password123'),
                'role' => UserRole::JOB_SEEKER,
                'is_active' => true,
            ],
            [
                'first_name' => 'Дмитрий',
                'last_name' => 'Козлов',
                'middle_name' => 'Андреевич',
                'email' => 'dmitry.kozlov@example.com',
                'password' => Hash::make('password123'),
                'role' => UserRole::EMPLOYER,
                'is_active' => true,
            ],
            [
                'first_name' => 'Елена',
                'last_name' => 'Волкова',
                'middle_name' => 'Петровна',
                'email' => 'elena.volkova@example.com',
                'password' => Hash::make('password123'),
                'role' => UserRole::EMPLOYER,
                'is_active' => true,
            ],
            [
                'first_name' => 'Андрей',
                'last_name' => 'Смирнов',
                'middle_name' => 'Владимирович',
                'email' => 'andrey.smirnov@example.com',
                'password' => Hash::make('password123'),
                'role' => UserRole::JOB_SEEKER,
                'is_active' => true,
            ]
        ];

        foreach ($users as $userData) {
            User::updateOrCreate(
                ['email' => $userData['email']],
                $userData
            );
        }

        $this->command->info('Обработано ' . count($users) . ' пользователей (3 работодателя, 2 соискателя)');
    }
}
