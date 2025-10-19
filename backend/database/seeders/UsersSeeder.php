<?php
declare(strict_types=1);

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
    public function run(): void {
        $users = [
            // Работодатели
            [
                'first_name'  => 'Александр',
                'last_name'   => 'Петров',
                'middle_name' => 'Иванович',
                'email'       => 'alexander.petrov@example.com',
                'password'    => Hash::make('password123'),
                'role'        => UserRole::EMPLOYER,
                'is_active'   => true,
            ],
            [
                'first_name'  => 'Дмитрий',
                'last_name'   => 'Козлов',
                'middle_name' => 'Андреевич',
                'email'       => 'dmitry.kozlov@example.com',
                'password'    => Hash::make('password123'),
                'role'        => UserRole::EMPLOYER,
                'is_active'   => true,
            ],
            [
                'first_name'  => 'Елена',
                'last_name'   => 'Волкова',
                'middle_name' => 'Петровна',
                'email'       => 'elena.volkova@example.com',
                'password'    => Hash::make('password123'),
                'role'        => UserRole::EMPLOYER,
                'is_active'   => true,
            ],
            [
                'first_name'  => 'Игорь',
                'last_name'   => 'Соколов',
                'middle_name' => 'Николаевич',
                'email'       => 'igor.sokolov@example.com',
                'password'    => Hash::make('password123'),
                'role'        => UserRole::EMPLOYER,
                'is_active'   => true,
            ],
            [
                'first_name'  => 'Ольга',
                'last_name'   => 'Морозова',
                'middle_name' => 'Дмитриевна',
                'email'       => 'olga.morozova@example.com',
                'password'    => Hash::make('password123'),
                'role'        => UserRole::EMPLOYER,
                'is_active'   => true,
            ],
            [
                'first_name'  => 'Сергей',
                'last_name'   => 'Новikov',
                'middle_name' => 'Александрович',
                'email'       => 'sergey.novikov@example.com',
                'password'    => Hash::make('password123'),
                'role'        => UserRole::EMPLOYER,
                'is_active'   => true,
            ],
            [
                'first_name'  => 'Татьяна',
                'last_name'   => 'Павлова',
                'middle_name' => 'Игоревна',
                'email'       => 'tatyana.pavlova@example.com',
                'password'    => Hash::make('password123'),
                'role'        => UserRole::EMPLOYER,
                'is_active'   => true,
            ],
            [
                'first_name'  => 'Владимир',
                'last_name'   => 'Федоров',
                'middle_name' => 'Сергеевич',
                'email'       => 'vladimir.fedorov@example.com',
                'password'    => Hash::make('password123'),
                'role'        => UserRole::EMPLOYER,
                'is_active'   => true,
            ],
            [
                'first_name'  => 'Анна',
                'last_name'   => 'Орлова',
                'middle_name' => 'Владимировна',
                'email'       => 'anna.orlova@example.com',
                'password'    => Hash::make('password123'),
                'role'        => UserRole::EMPLOYER,
                'is_active'   => true,
            ],
            [
                'first_name'  => 'Максим',
                'last_name'   => 'Егоров',
                'middle_name' => 'Петрович',
                'email'       => 'maxim.egorov@example.com',
                'password'    => Hash::make('password123'),
                'role'        => UserRole::EMPLOYER,
                'is_active'   => true,
            ],
            [
                'first_name'  => 'Наталья',
                'last_name'   => 'Кузнецова',
                'middle_name' => 'Анатольевна',
                'email'       => 'natalya.kuznetsova@example.com',
                'password'    => Hash::make('password123'),
                'role'        => UserRole::EMPLOYER,
                'is_active'   => true,
            ],
            [
                'first_name'  => 'Виктор',
                'last_name'   => 'Лебедев',
                'middle_name' => 'Михайлович',
                'email'       => 'viktor.lebedev@example.com',
                'password'    => Hash::make('password123'),
                'role'        => UserRole::EMPLOYER,
                'is_active'   => true,
            ],
            [
                'first_name'  => 'Светлана',
                'last_name'   => 'Романова',
                'middle_name' => 'Викторовна',
                'email'       => 'svetlana.romanova@example.com',
                'password'    => Hash::make('password123'),
                'role'        => UserRole::EMPLOYER,
                'is_active'   => true,
            ],
            [
                'first_name'  => 'Алексей',
                'last_name'   => 'Васильев',
                'middle_name' => 'Юрьевич',
                'email'       => 'alexey.vasiliev@example.com',
                'password'    => Hash::make('password123'),
                'role'        => UserRole::EMPLOYER,
                'is_active'   => true,
            ],
            [
                'first_name'  => 'Ирина',
                'last_name'   => 'Макарова',
                'middle_name' => 'Алексеевна',
                'email'       => 'irina.makarova@example.com',
                'password'    => Hash::make('password123'),
                'role'        => UserRole::EMPLOYER,
                'is_active'   => true,
            ],
            [
                'first_name'  => 'Павел',
                'last_name'   => 'Захаров',
                'middle_name' => 'Константинович',
                'email'       => 'pavel.zakharov@example.com',
                'password'    => Hash::make('password123'),
                'role'        => UserRole::EMPLOYER,
                'is_active'   => true,
            ],
            [
                'first_name'  => 'Юлия',
                'last_name'   => 'Григорьева',
                'middle_name' => 'Павловна',
                'email'       => 'yulia.grigorieva@example.com',
                'password'    => Hash::make('password123'),
                'role'        => UserRole::EMPLOYER,
                'is_active'   => true,
            ],
            [
                'first_name'  => 'Роман',
                'last_name'   => 'Сергеев',
                'middle_name' => 'Олегович',
                'email'       => 'roman.sergeev@example.com',
                'password'    => Hash::make('password123'),
                'role'        => UserRole::EMPLOYER,
                'is_active'   => true,
            ],
            [
                'first_name'  => 'Екатерина',
                'last_name'   => 'Михайлова',
                'middle_name' => 'Романовна',
                'email'       => 'ekaterina.mikhailova@example.com',
                'password'    => Hash::make('password123'),
                'role'        => UserRole::EMPLOYER,
                'is_active'   => true,
            ],
            [
                'first_name'  => 'Константин',
                'last_name'   => 'Николаев',
                'middle_name' => 'Евгеньевич',
                'email'       => 'konstantin.nikolaev@example.com',
                'password'    => Hash::make('password123'),
                'role'        => UserRole::EMPLOYER,
                'is_active'   => true,
            ],

            // Соискатели
            [
                'first_name'  => 'Мария',
                'last_name'   => 'Сидорова',
                'middle_name' => 'Сергеевна',
                'email'       => 'maria.sidorova@example.com',
                'password'    => Hash::make('password123'),
                'role'        => UserRole::JOB_SEEKER,
                'is_active'   => true,
            ],
            [
                'first_name'  => 'Андрей',
                'last_name'   => 'Смирнов',
                'middle_name' => 'Владимирович',
                'email'       => 'andrey.smirnov@example.com',
                'password'    => Hash::make('password123'),
                'role'        => UserRole::JOB_SEEKER,
                'is_active'   => true,
            ],
            [
                'first_name'  => 'Денис',
                'last_name'   => 'Иванов',
                'middle_name' => 'Артемович',
                'email'       => 'denis.ivanov@example.com',
                'password'    => Hash::make('password123'),
                'role'        => UserRole::JOB_SEEKER,
                'is_active'   => true,
            ],
            [
                'first_name'  => 'Валерия',
                'last_name'   => 'Белова',
                'middle_name' => 'Игоревна',
                'email'       => 'valeria.belova@example.com',
                'password'    => Hash::make('password123'),
                'role'        => UserRole::JOB_SEEKER,
                'is_active'   => true,
            ],
            [
                'first_name'  => 'Артем',
                'last_name'   => 'Крылов',
                'middle_name' => 'Денисович',
                'email'       => 'artem.krylov@example.com',
                'password'    => Hash::make('password123'),
                'role'        => UserRole::JOB_SEEKER,
                'is_active'   => true,
            ],
            [
                'first_name'  => 'Дарья',
                'last_name'   => 'Соловьева',
                'middle_name' => 'Максимовна',
                'email'       => 'daria.solovieva@example.com',
                'password'    => Hash::make('password123'),
                'role'        => UserRole::JOB_SEEKER,
                'is_active'   => true,
            ],
            [
                'first_name'  => 'Никита',
                'last_name'   => 'Баранов',
                'middle_name' => 'Алексеевич',
                'email'       => 'nikita.baranov@example.com',
                'password'    => Hash::make('password123'),
                'role'        => UserRole::JOB_SEEKER,
                'is_active'   => true,
            ],
            [
                'first_name'  => 'Кристина',
                'last_name'   => 'Зайцева',
                'middle_name' => 'Сергеевна',
                'email'       => 'kristina.zaitseva@example.com',
                'password'    => Hash::make('password123'),
                'role'        => UserRole::JOB_SEEKER,
                'is_active'   => true,
            ],
            [
                'first_name'  => 'Илья',
                'last_name'   => 'Попов',
                'middle_name' => 'Дмитриевич',
                'email'       => 'ilya.popov@example.com',
                'password'    => Hash::make('password123'),
                'role'        => UserRole::JOB_SEEKER,
                'is_active'   => true,
            ],
            [
                'first_name'  => 'Вероника',
                'last_name'   => 'Медведева',
                'middle_name' => 'Андреевна',
                'email'       => 'veronika.medvedeva@example.com',
                'password'    => Hash::make('password123'),
                'role'        => UserRole::JOB_SEEKER,
                'is_active'   => true,
            ],

            // Институты
            [
                'first_name'  => 'Московский',
                'last_name'   => 'Институт',
                'middle_name' => 'Промышленности',
                'email'       => 'institute.mosprom@example.com',
                'password'    => Hash::make('password123'),
                'role'        => UserRole::INSTITUTE,
                'is_active'   => true,
            ],
            [
                'first_name'  => 'Технический',
                'last_name'   => 'Университет',
                'middle_name' => 'Машиностроения',
                'email'       => 'institute.mami@example.com',
                'password'    => Hash::make('password123'),
                'role'        => UserRole::INSTITUTE,
                'is_active'   => true,
            ],
            [
                'first_name'  => 'Городской',
                'last_name'   => 'Колледж',
                'middle_name' => 'Технологий',
                'email'       => 'institute.college@example.com',
                'password'    => Hash::make('password123'),
                'role'        => UserRole::INSTITUTE,
                'is_active'   => true,
            ],
        ];

        foreach ($users as $userData) {
            User::updateOrCreate(
                ['email' => $userData['email']],
                $userData,
            );
        }

        $employers  = array_filter($users, static fn ($u) => $u['role'] === UserRole::EMPLOYER);
        $seekers    = array_filter($users, static fn ($u) => $u['role'] === UserRole::JOB_SEEKER);
        $institutes = array_filter($users, static fn ($u) => $u['role'] === UserRole::INSTITUTE);

        $this->command->info(
            'Обработано ' . count($users)
            . ' пользователей (работодателей: ' . count($employers)
            . ', соискателей: ' . count($seekers)
            . ', институтов: ' . count($institutes) . ')',
        );
    }
}
