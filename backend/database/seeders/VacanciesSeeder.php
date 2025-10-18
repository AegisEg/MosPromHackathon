<?php
declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Vacancies;
use App\Models\Companies;
use App\Models\Professions;
use App\Models\Skills;
use App\Enums\EmploymentType;
use App\Enums\ExperienceLevel;
use App\Models\User;
use Illuminate\Database\Seeder;

class VacanciesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void {
        // Получаем компании и профессии
        $companies   = Companies::all();
        $professions = Professions::all(); // Берем все профессии
        $skills      = Skills::all();
        $users       = User::where('role', 1)->get(); // Берем всех работодателей

        if ($companies->count() < 20 || $professions->count() < 3) {
            $this->command->warn('Недостаточно компаний или профессий. Сначала запустите CompaniesSeeder и ProfessionsSeeder.');

            return;
        }

        $vacancies = [
            [
                'company_id'      => $companies[0]->id,
                'user_id'         => $users[0]->id,
                'title'           => 'Senior Full Stack Developer (PHP/Laravel + React)',
                'profession_id'   => $professions[0]->id, // Программист
                'description'     => 'Ищем опытного Full Stack разработчика для работы над крупными веб-проектами. Требуется знание PHP, Laravel, JavaScript, React, MySQL, Git, Docker. Опыт работы от 4 лет. Участие в архитектурных решениях, менторство junior разработчиков.',
                'employment_type' => EmploymentType::FULL_TIME,
                'experience_wide' => ExperienceLevel::SENIOR->value,
                'salary_from'     => 180000,
                'salary_to'       => 250000,
                'status'          => true,
            ],
            [
                'company_id'      => $companies[1]->id,
                'user_id'         => $users[1]->id,
                'title'           => 'Python Backend Developer (Django/FastAPI)',
                'profession_id'   => $professions[0]->id, // Программист
                'description'     => 'Разработка высоконагруженных backend-сервисов на Python. Требуется знание Django/FastAPI, PostgreSQL, Redis, Docker, Git. Опыт работы с микросервисной архитектурой, API design, тестированием. Опыт от 3 лет.',
                'employment_type' => EmploymentType::FULL_TIME,
                'experience_wide' => ExperienceLevel::MIDDLE->value,
                'salary_from'     => 150000,
                'salary_to'       => 220000,
                'status'          => true,
            ],
            [
                'company_id'      => $companies[2]->id,
                'user_id'         => $users[2]->id,
                'title'           => 'HR-консультант',
                'profession_id'   => $professions[9]->id, // HR-менеджер
                'description'     => 'Консультирование клиентов по вопросам управления персоналом, подбор кадров, разработка HR-стратегий. Опыт работы в HR от 2 лет.',
                'employment_type' => EmploymentType::PART_TIME,
                'experience_wide' => ExperienceLevel::JUNIOR->value,
                'salary_from'     => 60000,
                'salary_to'       => 90000,
                'status'          => true,
            ],
            // Новые вакансии
            [
                'company_id'      => $companies[3]->id,
                'user_id'         => $users[3]->id,
                'title'           => 'Бизнес-аналитик',
                'profession_id'   => $professions[8]->id, // Аналитик данных
                'description'     => 'Требуется опытный бизнес-аналитик для работы с большими данными. Знание SQL, Python, аналитических инструментов.',
                'employment_type' => EmploymentType::FULL_TIME,
                'experience_wide' => ExperienceLevel::MIDDLE->value,
                'salary_from'     => 150000,
                'salary_to'       => 220000,
                'status'          => true,
            ],
            [
                'company_id'      => $companies[4]->id,
                'user_id'         => $users[4]->id,
                'title'           => 'Специалист по информационной безопасности',
                'profession_id'   => $professions[0]->id, // Программист
                'description'     => 'Защита информационных систем от киберугроз. Опыт работы с системами безопасности, знание стандартов ИБ.',
                'employment_type' => EmploymentType::FULL_TIME,
                'experience_wide' => ExperienceLevel::SENIOR->value,
                'salary_from'     => 180000,
                'salary_to'       => 250000,
                'status'          => false,
            ],
            [
                'company_id'      => $companies[5]->id,
                'user_id'         => $users[5]->id,
                'title'           => 'Python Developer',
                'profession_id'   => $professions[0]->id, // Программист
                'description'     => 'Разработка backend-сервисов на Python. Django/Flask, PostgreSQL, Docker. Опыт от 2 лет.',
                'employment_type' => EmploymentType::FULL_TIME,
                'experience_wide' => ExperienceLevel::MIDDLE->value,
                'salary_from'     => 140000,
                'salary_to'       => 200000,
                'status'          => true,
            ],
            [
                'company_id'      => $companies[6]->id,
                'user_id'         => $users[6]->id,
                'title'           => 'iOS Developer',
                'profession_id'   => $professions[0]->id, // Программист
                'description'     => 'Разработка мобильных приложений для iOS. Swift, SwiftUI, опыт работы с API.',
                'employment_type' => EmploymentType::FULL_TIME,
                'experience_wide' => ExperienceLevel::MIDDLE->value,
                'salary_from'     => 150000,
                'salary_to'       => 210000,
                'status'          => true,
            ],
            [
                'company_id'      => $companies[7]->id,
                'user_id'         => $users[7]->id,
                'title'           => 'Инженер связи',
                'profession_id'   => $professions[4]->id, // Инженер
                'description'     => 'Обслуживание и настройка телекоммуникационного оборудования. Опыт работы с сетевыми технологиями.',
                'employment_type' => EmploymentType::FULL_TIME,
                'experience_wide' => ExperienceLevel::MIDDLE->value,
                'salary_from'     => 90000,
                'salary_to'       => 140000,
                'status'          => false,
            ],
            [
                'company_id'      => $companies[8]->id,
                'user_id'         => $users[8]->id,
                'title'           => 'Главный бухгалтер',
                'profession_id'   => $professions[6]->id, // Бухгалтер
                'description'     => 'Ведение бухгалтерского учета, подготовка отчетности, взаимодействие с налоговыми органами. Опыт от 5 лет.',
                'employment_type' => EmploymentType::FULL_TIME,
                'experience_wide' => ExperienceLevel::SENIOR->value,
                'salary_from'     => 120000,
                'salary_to'       => 180000,
                'status'          => true,
            ],
            [
                'company_id'      => $companies[9]->id,
                'user_id'         => $users[9]->id,
                'title'           => 'Менеджер логистики',
                'profession_id'   => $professions[1]->id, // Менеджер по продажам
                'description'     => 'Организация доставки грузов, работа с поставщиками, оптимизация логистических процессов.',
                'employment_type' => EmploymentType::FULL_TIME,
                'experience_wide' => ExperienceLevel::MIDDLE->value,
                'salary_from'     => 80000,
                'salary_to'       => 120000,
                'status'          => true,
            ],
            [
                'company_id'      => $companies[10]->id,
                'user_id'         => $users[10]->id,
                'title'           => 'Продавец-консультант',
                'profession_id'   => $professions[1]->id, // Менеджер по продажам
                'description'     => 'Консультирование покупателей, работа с кассой, выкладка товара. График сменный.',
                'employment_type' => EmploymentType::FULL_TIME,
                'experience_wide' => ExperienceLevel::JUNIOR->value,
                'salary_from'     => 40000,
                'salary_to'       => 60000,
                'status'          => false,
            ],
            [
                'company_id'      => $companies[11]->id,
                'user_id'         => $users[11]->id,
                'title'           => 'Frontend Developer (React)',
                'profession_id'   => $professions[0]->id, // Программист
                'description'     => 'Разработка пользовательских интерфейсов на React. TypeScript, Redux, опыт оптимизации производительности.',
                'employment_type' => EmploymentType::FULL_TIME,
                'experience_wide' => ExperienceLevel::MIDDLE->value,
                'salary_from'     => 130000,
                'salary_to'       => 190000,
                'status'          => true,
            ],
            [
                'company_id'      => $companies[12]->id,
                'user_id'         => $users[12]->id,
                'title'           => 'Менеджер маркетплейса',
                'profession_id'   => $professions[5]->id, // Маркетолог
                'description'     => 'Управление товарными карточками, аналитика продаж, работа с рекламными кампаниями на маркетплейсе.',
                'employment_type' => EmploymentType::FULL_TIME,
                'experience_wide' => ExperienceLevel::JUNIOR->value,
                'salary_from'     => 70000,
                'salary_to'       => 100000,
                'status'          => true,
            ],
            [
                'company_id'      => $companies[13]->id,
                'user_id'         => $users[13]->id,
                'title'           => 'Менеджер по подбору персонала',
                'profession_id'   => $professions[9]->id, // HR-менеджер
                'description'     => 'Поиск и подбор кандидатов, проведение собеседований, работа с базами резюме.',
                'employment_type' => EmploymentType::FULL_TIME,
                'experience_wide' => ExperienceLevel::MIDDLE->value,
                'salary_from'     => 70000,
                'salary_to'       => 110000,
                'status'          => false,
            ],
            [
                'company_id'      => $companies[14]->id,
                'user_id'         => $users[14]->id,
                'title'           => 'Методист онлайн-курсов',
                'profession_id'   => $professions[3]->id, // Учитель
                'description'     => 'Разработка образовательных программ, создание учебных материалов, проверка качества курсов.',
                'employment_type' => EmploymentType::FULL_TIME,
                'experience_wide' => ExperienceLevel::MIDDLE->value,
                'salary_from'     => 80000,
                'salary_to'       => 120000,
                'status'          => true,
            ],
            [
                'company_id'      => $companies[15]->id,
                'user_id'         => $users[15]->id,
                'title'           => 'Android Developer',
                'profession_id'   => $professions[0]->id, // Программист
                'description'     => 'Разработка мобильных приложений на Android. Kotlin, Jetpack Compose, опыт работы с REST API.',
                'employment_type' => EmploymentType::FULL_TIME,
                'experience_wide' => ExperienceLevel::MIDDLE->value,
                'salary_from'     => 140000,
                'salary_to'       => 200000,
                'status'          => true,
            ],
            [
                'company_id'      => $companies[16]->id,
                'user_id'         => $users[16]->id,
                'title'           => 'Системный администратор',
                'profession_id'   => $professions[4]->id, // Инженер
                'description'     => 'Администрирование серверов, настройка сетевого оборудования, поддержка пользователей.',
                'employment_type' => EmploymentType::FULL_TIME,
                'experience_wide' => ExperienceLevel::MIDDLE->value,
                'salary_from'     => 90000,
                'salary_to'       => 140000,
                'status'          => false,
            ],
            [
                'company_id'      => $companies[17]->id,
                'user_id'         => $users[17]->id,
                'title'           => 'Data Scientist',
                'profession_id'   => $professions[8]->id, // Аналитик данных
                'description'     => 'Анализ больших данных, построение ML-моделей, работа с Python (pandas, sklearn, tensorflow).',
                'employment_type' => EmploymentType::FULL_TIME,
                'experience_wide' => ExperienceLevel::SENIOR->value,
                'salary_from'     => 200000,
                'salary_to'       => 300000,
                'status'          => true,
            ],
            [
                'company_id'      => $companies[18]->id,
                'user_id'         => $users[18]->id,
                'title'           => 'Директор магазина',
                'profession_id'   => $professions[1]->id, // Менеджер по продажам
                'description'     => 'Управление торговой точкой, контроль персонала, выполнение планов продаж, взаимодействие с поставщиками.',
                'employment_type' => EmploymentType::FULL_TIME,
                'experience_wide' => ExperienceLevel::SENIOR->value,
                'salary_from'     => 100000,
                'salary_to'       => 150000,
                'status'          => true,
            ],
            [
                'company_id'      => $companies[19]->id,
                'user_id'         => $users[19]->id,
                'title'           => 'Product Manager',
                'profession_id'   => $professions[5]->id, // Маркетолог
                'description'     => 'Управление продуктом, взаимодействие с командой разработки, аналитика метрик, работа с пользователями.',
                'employment_type' => EmploymentType::FULL_TIME,
                'experience_wide' => ExperienceLevel::MIDDLE->value,
                'salary_from'     => 150000,
                'salary_to'       => 220000,
                'status'          => true,
            ],
            [
                'company_id'      => $companies[0]->id,
                'user_id'         => $users[0]->id,
                'title'           => 'Junior PHP Developer',
                'profession_id'   => $professions[0]->id, // Программист
                'description'     => 'Начинающий разработчик для работы в команде. Знание PHP, HTML, CSS, SQL. Готовность к обучению.',
                'employment_type' => EmploymentType::FULL_TIME,
                'experience_wide' => ExperienceLevel::JUNIOR->value,
                'salary_from'     => 60000,
                'salary_to'       => 90000,
                'status'          => true,
            ],
            [
                'company_id'      => $companies[1]->id,
                'user_id'         => $users[1]->id,
                'title'           => 'Врач-терапевт',
                'profession_id'   => $professions[2]->id, // Врач
                'description'     => 'Прием пациентов, диагностика заболеваний, назначение лечения. Высшее медицинское образование.',
                'employment_type' => EmploymentType::FULL_TIME,
                'experience_wide' => ExperienceLevel::MIDDLE->value,
                'salary_from'     => 80000,
                'salary_to'       => 120000,
                'status'          => false,
            ],
            [
                'company_id'      => $companies[3]->id,
                'user_id'         => $users[3]->id,
                'title'           => 'Кредитный эксперт',
                'profession_id'   => $professions[6]->id, // Бухгалтер
                'description'     => 'Оценка кредитных заявок, работа с документами, взаимодействие с клиентами по кредитным продуктам.',
                'employment_type' => EmploymentType::FULL_TIME,
                'experience_wide' => ExperienceLevel::MIDDLE->value,
                'salary_from'     => 70000,
                'salary_to'       => 100000,
                'status'          => true,
            ],
            [
                'company_id'      => $companies[5]->id,
                'user_id'         => $users[5]->id,
                'title'           => 'QA Engineer',
                'profession_id'   => $professions[0]->id, // Программист
                'description'     => 'Тестирование веб-приложений, автоматизация тестов, работа с Selenium, pytest.',
                'employment_type' => EmploymentType::FULL_TIME,
                'experience_wide' => ExperienceLevel::MIDDLE->value,
                'salary_from'     => 110000,
                'salary_to'       => 160000,
                'status'          => true,
            ],
            [
                'company_id'      => $companies[7]->id,
                'user_id'         => $users[7]->id,
                'title'           => 'Специалист технической поддержки',
                'profession_id'   => $professions[4]->id, // Инженер
                'description'     => 'Консультирование клиентов по техническим вопросам, решение проблем со связью.',
                'employment_type' => EmploymentType::FULL_TIME,
                'experience_wide' => ExperienceLevel::JUNIOR->value,
                'salary_from'     => 50000,
                'salary_to'       => 75000,
                'status'          => true,
            ],
            [
                'company_id'      => $companies[10]->id,
                'user_id'         => $users[10]->id,
                'title'           => 'Кассир',
                'profession_id'   => $professions[1]->id, // Менеджер по продажам
                'description'     => 'Работа на кассе, обслуживание покупателей, работа с кассовым аппаратом.',
                'employment_type' => EmploymentType::FULL_TIME,
                'experience_wide' => ExperienceLevel::JUNIOR->value,
                'salary_from'     => 35000,
                'salary_to'       => 50000,
                'status'          => false,
            ],
            [
                'company_id'      => $companies[11]->id,
                'user_id'         => $users[11]->id,
                'title'           => 'DevOps Engineer',
                'profession_id'   => $professions[4]->id, // Инженер
                'description'     => 'Настройка CI/CD, администрирование Kubernetes, Docker, облачных платформ (AWS, GCP).',
                'employment_type' => EmploymentType::FULL_TIME,
                'experience_wide' => ExperienceLevel::SENIOR->value,
                'salary_from'     => 180000,
                'salary_to'       => 260000,
                'status'          => true,
            ],
            [
                'company_id'      => $companies[13]->id,
                'user_id'         => $users[13]->id,
                'title'           => 'Специалист по обучению и развитию',
                'profession_id'   => $professions[9]->id, // HR-менеджер
                'description'     => 'Организация обучения сотрудников, разработка программ развития, проведение тренингов.',
                'employment_type' => EmploymentType::FULL_TIME,
                'experience_wide' => ExperienceLevel::MIDDLE->value,
                'salary_from'     => 80000,
                'salary_to'       => 120000,
                'status'          => true,
            ],
            [
                'company_id'      => $companies[14]->id,
                'user_id'         => $users[14]->id,
                'title'           => 'Преподаватель программирования',
                'profession_id'   => $professions[3]->id, // Учитель
                'description'     => 'Ведение онлайн-курсов по программированию, проверка домашних заданий, консультирование студентов.',
                'employment_type' => EmploymentType::PART_TIME,
                'experience_wide' => ExperienceLevel::MIDDLE->value,
                'salary_from'     => 60000,
                'salary_to'       => 90000,
                'status'          => true,
            ],
            [
                'company_id'      => $companies[16]->id,
                'user_id'         => $users[16]->id,
                'title'           => 'Инженер-проектировщик',
                'profession_id'   => $professions[4]->id, // Инженер
                'description'     => 'Проектирование телекоммуникационных сетей, работа с AutoCAD, подготовка технической документации.',
                'employment_type' => EmploymentType::FULL_TIME,
                'experience_wide' => ExperienceLevel::MIDDLE->value,
                'salary_from'     => 100000,
                'salary_to'       => 150000,
                'status'          => false,
            ],
            [
                'company_id'      => $companies[17]->id,
                'user_id'         => $users[17]->id,
                'title'           => 'Финансовый аналитик',
                'profession_id'   => $professions[8]->id, // Аналитик данных
                'description'     => 'Анализ финансовых показателей, подготовка отчетов, прогнозирование, работа с Excel, Power BI.',
                'employment_type' => EmploymentType::FULL_TIME,
                'experience_wide' => ExperienceLevel::MIDDLE->value,
                'salary_from'     => 120000,
                'salary_to'       => 180000,
                'status'          => true,
            ],
            [
                'company_id'      => $companies[19]->id,
                'user_id'         => $users[19]->id,
                'title'           => 'UI/UX Designer',
                'profession_id'   => $professions[7]->id, // Дизайнер
                'description'     => 'Проектирование интерфейсов, создание прототипов, работа в Figma, проведение UX-исследований.',
                'employment_type' => EmploymentType::FULL_TIME,
                'experience_wide' => ExperienceLevel::MIDDLE->value,
                'salary_from'     => 120000,
                'salary_to'       => 180000,
                'status'          => true,
            ],
            [
                'company_id'      => $companies[2]->id,
                'user_id'         => $users[2]->id,
                'title'           => 'Бизнес-консультант',
                'profession_id'   => $professions[8]->id, // Аналитик данных
                'description'     => 'Консультирование по вопросам управления бизнесом, оптимизация бизнес-процессов, разработка стратегий.',
                'employment_type' => EmploymentType::FULL_TIME,
                'experience_wide' => ExperienceLevel::SENIOR->value,
                'salary_from'     => 140000,
                'salary_to'       => 200000,
                'status'          => true,
            ],
            [
                'company_id'      => $companies[4]->id,
                'user_id'         => $users[4]->id,
                'title'           => 'Penetration Tester',
                'profession_id'   => $professions[0]->id, // Программист
                'description'     => 'Тестирование на проникновение, поиск уязвимостей, составление отчетов по безопасности.',
                'employment_type' => EmploymentType::FULL_TIME,
                'experience_wide' => ExperienceLevel::SENIOR->value,
                'salary_from'     => 200000,
                'salary_to'       => 280000,
                'status'          => true,
            ],
            [
                'company_id'      => $companies[6]->id,
                'user_id'         => $users[6]->id,
                'title'           => 'Flutter Developer',
                'profession_id'   => $professions[0]->id, // Программист
                'description'     => 'Кроссплатформенная разработка мобильных приложений на Flutter/Dart.',
                'employment_type' => EmploymentType::FULL_TIME,
                'experience_wide' => ExperienceLevel::MIDDLE->value,
                'salary_from'     => 140000,
                'salary_to'       => 190000,
                'status'          => true,
            ],
            [
                'company_id'      => $companies[8]->id,
                'user_id'         => $users[8]->id,
                'title'           => 'Бухгалтер по расчету заработной платы',
                'profession_id'   => $professions[6]->id, // Бухгалтер
                'description'     => 'Расчет заработной платы, начисление налогов и взносов, подготовка отчетности в ФНС и ПФР.',
                'employment_type' => EmploymentType::FULL_TIME,
                'experience_wide' => ExperienceLevel::MIDDLE->value,
                'salary_from'     => 70000,
                'salary_to'       => 100000,
                'status'          => true,
            ],
            [
                'company_id'      => $companies[9]->id,
                'user_id'         => $users[9]->id,
                'title'           => 'Курьер',
                'profession_id'   => $professions[1]->id, // Менеджер по продажам
                'description'     => 'Доставка посылок и грузов клиентам. Наличие личного автомобиля приветствуется.',
                'employment_type' => EmploymentType::FULL_TIME,
                'experience_wide' => ExperienceLevel::JUNIOR->value,
                'salary_from'     => 45000,
                'salary_to'       => 70000,
                'status'          => false,
            ],
            [
                'company_id'      => $companies[12]->id,
                'user_id'         => $users[12]->id,
                'title'           => 'Контент-менеджер',
                'profession_id'   => $professions[5]->id, // Маркетолог
                'description'     => 'Наполнение сайта контентом, редактирование текстов, работа с CMS, SEO-оптимизация.',
                'employment_type' => EmploymentType::FULL_TIME,
                'experience_wide' => ExperienceLevel::JUNIOR->value,
                'salary_from'     => 55000,
                'salary_to'       => 80000,
                'status'          => true,
            ],
            [
                'company_id'      => $companies[15]->id,
                'user_id'         => $users[15]->id,
                'title'           => 'Менеджер по работе с клиентами',
                'profession_id'   => $professions[1]->id, // Менеджер по продажам
                'description'     => 'Консультирование пользователей платформы, решение спорных ситуаций, поддержка клиентов.',
                'employment_type' => EmploymentType::FULL_TIME,
                'experience_wide' => ExperienceLevel::MIDDLE->value,
                'salary_from'     => 65000,
                'salary_to'       => 95000,
                'status'          => true,
            ],
            [
                'company_id'      => $companies[18]->id,
                'user_id'         => $users[18]->id,
                'title'           => 'Товаровед',
                'profession_id'   => $professions[1]->id, // Менеджер по продажам
                'description'     => 'Контроль за ассортиментом, заказ товаров, работа с поставщиками, анализ продаж.',
                'employment_type' => EmploymentType::FULL_TIME,
                'experience_wide' => ExperienceLevel::MIDDLE->value,
                'salary_from'     => 60000,
                'salary_to'       => 90000,
                'status'          => true,
            ],
            [
                'company_id'      => $companies[19]->id,
                'user_id'         => $users[19]->id,
                'title'           => 'SMM-менеджер',
                'profession_id'   => $professions[5]->id, // Маркетолог
                'description'     => 'Ведение социальных сетей компании, создание контента, работа с блогерами, анализ метрик.',
                'employment_type' => EmploymentType::FULL_TIME,
                'experience_wide' => ExperienceLevel::JUNIOR->value,
                'salary_from'     => 60000,
                'salary_to'       => 90000,
                'status'          => false,
            ],
            [
                'company_id'      => $companies[5]->id,
                'user_id'         => $users[5]->id,
                'title'           => 'Full Stack Developer',
                'profession_id'   => $professions[0]->id, // Программист
                'description'     => 'Разработка полного цикла: frontend (React) + backend (Node.js/Python). PostgreSQL, Docker, Git.',
                'employment_type' => EmploymentType::FULL_TIME,
                'experience_wide' => ExperienceLevel::SENIOR->value,
                'salary_from'     => 180000,
                'salary_to'       => 260000,
                'status'          => true,
            ],
            [
                'company_id'      => $companies[11]->id,
                'user_id'         => $users[11]->id,
                'title'           => 'Менеджер по работе с маркетплейсами',
                'profession_id'   => $professions[5]->id, // Маркетолог
                'description'     => 'Управление продажами на маркетплейсах, ценообразование, анализ конкурентов, работа с рекламой.',
                'employment_type' => EmploymentType::FULL_TIME,
                'experience_wide' => ExperienceLevel::MIDDLE->value,
                'salary_from'     => 80000,
                'salary_to'       => 120000,
                'status'          => true,
            ],
            [
                'company_id'      => $companies[3]->id,
                'user_id'         => $users[3]->id,
                'title'           => 'Специалист по работе с VIP-клиентами',
                'profession_id'   => $professions[1]->id, // Менеджер по продажам
                'description'     => 'Индивидуальное обслуживание премиум-клиентов банка, предложение банковских продуктов.',
                'employment_type' => EmploymentType::FULL_TIME,
                'experience_wide' => ExperienceLevel::MIDDLE->value,
                'salary_from'     => 100000,
                'salary_to'       => 150000,
                'status'          => true,
            ],
            [
                'company_id'      => $companies[17]->id,
                'user_id'         => $users[17]->id,
                'title'           => 'Графический дизайнер',
                'profession_id'   => $professions[7]->id, // Дизайнер
                'description'     => 'Создание рекламных материалов, баннеров, презентаций. Работа в Adobe Photoshop, Illustrator.',
                'employment_type' => EmploymentType::FULL_TIME,
                'experience_wide' => ExperienceLevel::MIDDLE->value,
                'salary_from'     => 80000,
                'salary_to'       => 120000,
                'status'          => true,
            ],
            // Вакансии с гибкими формами занятости
            [
                'company_id'      => $companies[5]->id,
                'user_id'         => $users[5]->id,
                'title'           => 'Копирайтер (удаленно)',
                'profession_id'   => $professions[5]->id, // Маркетолог
                'description'     => 'Написание текстов для сайта, блога, социальных сетей. Удаленная работа, свободный график.',
                'employment_type' => EmploymentType::FREELANCE,
                'experience_wide' => ExperienceLevel::MIDDLE->value,
                'salary_from'     => 50000,
                'salary_to'       => 80000,
                'status'          => true,
            ],
            [
                'company_id'      => $companies[14]->id,
                'user_id'         => $users[14]->id,
                'title'           => 'Стажер-программист',
                'profession_id'   => $professions[0]->id, // Программист
                'description'     => 'Стажировка для студентов и начинающих программистов. Обучение на реальных проектах, менторская поддержка.',
                'employment_type' => EmploymentType::INTERNSHIP,
                'experience_wide' => ExperienceLevel::JUNIOR->value,
                'salary_from'     => 30000,
                'salary_to'       => 50000,
                'status'          => true,
            ],
            [
                'company_id'      => $companies[13]->id,
                'user_id'         => $users[13]->id,
                'title'           => 'HR-ассистент (неполный день)',
                'profession_id'   => $professions[9]->id, // HR-менеджер
                'description'     => 'Помощь в подборе персонала, работа с документами. График 4 часа в день, возможна удаленка.',
                'employment_type' => EmploymentType::PART_TIME,
                'experience_wide' => ExperienceLevel::JUNIOR->value,
                'salary_from'     => 30000,
                'salary_to'       => 45000,
                'status'          => true,
            ],
            [
                'company_id'      => $companies[19]->id,
                'user_id'         => $users[19]->id,
                'title'           => 'Веб-дизайнер (проектная работа)',
                'profession_id'   => $professions[7]->id, // Дизайнер
                'description'     => 'Дизайн landing pages, баннеров. Работа на условиях договора ГПХ, проектная основа.',
                'employment_type' => EmploymentType::CONTRACT,
                'experience_wide' => ExperienceLevel::MIDDLE->value,
                'salary_from'     => 60000,
                'salary_to'       => 90000,
                'status'          => true,
            ],
            [
                'company_id'      => $companies[11]->id,
                'user_id'         => $users[11]->id,
                'title'           => 'Контент-маркетолог (фриланс)',
                'profession_id'   => $professions[5]->id, // Маркетолог
                'description'     => 'Разработка контент-стратегии, ведение блога. Удаленная работа, оплата за результат.',
                'employment_type' => EmploymentType::FREELANCE,
                'experience_wide' => ExperienceLevel::MIDDLE->value,
                'salary_from'     => 55000,
                'salary_to'       => 85000,
                'status'          => true,
            ],
            [
                'company_id'      => $companies[3]->id,
                'user_id'         => $users[3]->id,
                'title'           => 'Стажер в отдел аналитики',
                'profession_id'   => $professions[8]->id, // Аналитик данных
                'description'     => 'Программа стажировки для студентов 3-4 курсов. Работа с данными, Excel, обучение SQL и Python.',
                'employment_type' => EmploymentType::INTERNSHIP,
                'experience_wide' => ExperienceLevel::JUNIOR->value,
                'salary_from'     => 35000,
                'salary_to'       => 55000,
                'status'          => true,
            ],
            [
                'company_id'      => $companies[10]->id,
                'user_id'         => $users[10]->id,
                'title'           => 'Продавец (подработка)',
                'profession_id'   => $professions[1]->id, // Менеджер по продажам
                'description'     => 'Работа в выходные дни или вечерние смены. Гибкий график, подходит для студентов.',
                'employment_type' => EmploymentType::PART_TIME,
                'experience_wide' => ExperienceLevel::JUNIOR->value,
                'salary_from'     => 25000,
                'salary_to'       => 40000,
                'status'          => true,
            ],
            [
                'company_id'      => $companies[4]->id,
                'user_id'         => $users[4]->id,
                'title'           => 'Консультант по ИБ (договор ГПХ)',
                'profession_id'   => $professions[0]->id, // Программист
                'description'     => 'Консультирование по вопросам информационной безопасности. Проектная работа, договор подряда.',
                'employment_type' => EmploymentType::CONTRACT,
                'experience_wide' => ExperienceLevel::SENIOR->value,
                'salary_from'     => 120000,
                'salary_to'       => 180000,
                'status'          => true,
            ],
            [
                'company_id'      => $companies[15]->id,
                'user_id'         => $users[15]->id,
                'title'           => 'Репетитор по программированию (фриланс)',
                'profession_id'   => $professions[3]->id, // Учитель
                'description'     => 'Индивидуальные занятия по программированию онлайн. Свободный график, почасовая оплата.',
                'employment_type' => EmploymentType::FREELANCE,
                'experience_wide' => ExperienceLevel::MIDDLE->value,
                'salary_from'     => 40000,
                'salary_to'       => 70000,
                'status'          => true,
            ],
            [
                'company_id'      => $companies[8]->id,
                'user_id'         => $users[8]->id,
                'title'           => 'Помощник бухгалтера (частичная занятость)',
                'profession_id'   => $professions[6]->id, // Бухгалтер
                'description'     => 'Помощь в ведении первичной документации, работа с 1С. График 4-5 часов в день.',
                'employment_type' => EmploymentType::PART_TIME,
                'experience_wide' => ExperienceLevel::JUNIOR->value,
                'salary_from'     => 35000,
                'salary_to'       => 50000,
                'status'          => true,
            ],
        ];

        // Найдем навыки программистов
        $programmerSkills = Skills::whereIn('name', [
            'PHP', 'JavaScript', 'Python', 'C#', 'Java', 'Git', 'Docker', 'MySQL', 'Laravel', 'React'
        ])->get();

        foreach ($vacancies as $index => $vacancyData) {
            $vacancy = Vacancies::create($vacancyData);

            // Для первых двух вакансий (id=1 и id=2) привязываем навыки программистов
            if ($index < 2 && $programmerSkills->count() > 0) {
                // Привязываем все навыки программистов плюс несколько случайных общих навыков
                $allSkills = $programmerSkills->merge($skills->whereNotIn('name', [
                    'PHP', 'JavaScript', 'Python', 'C#', 'Java', 'Git', 'Docker', 'MySQL', 'Laravel', 'React'
                ])->random(rand(2, 4)));
                $vacancy->skills()->sync($allSkills->pluck('id'));
            } else {
                // Для остальных вакансий привязываем случайные навыки
                if ($skills->count() > 0) {
                    $randomSkills = $skills->random(rand(3, min(6, $skills->count())));
                    $vacancy->skills()->sync($randomSkills->pluck('id'));
                }
            }
        }

        $this->command->info('Создано ' . count($vacancies) . ' вакансий (53 вакансии)');
    }
}
