# MosPromHr

**MosPromHr** — это современная платформа для рекрутинга и управления вакансиями, разработанная с использованием чистой архитектуры (Domain-Driven Design).

## 📋 Описание проекта

MosPromHr представляет собой REST API систему для автоматизации процессов подбора персонала, включающую:

-   👥 **Управление резюме** — создание, редактирование и просмотр резюме соискателей
-   💼 **Управление вакансиями** — публикация и управление открытыми позициями
-   🏢 **Управление компаниями** — профили работодателей и их вакансии
-   🔐 **Аутентификация и авторизация** — безопасный доступ через JWT/Sanctum
-   🎯 **Управление навыками и профессиями** — структурированная система компетенций
-   📊 **Система откликов** — взаимодействие между соискателями и работодателями

## 🛠 Технологический стек

### Backend

-   **PHP 8.2+** — современная версия PHP с поддержкой типизации
-   **Laravel 12** — мощный PHP-фреймворк
-   **PostgreSQL** — надёжная реляционная СУБД
-   **Laravel Sanctum** — аутентификация API
-   **JWT Authentication** — токены доступа

### DevOps & Tools

-   **Docker** — контейнеризация приложения
-   **Nginx** — веб-сервер
-   **PHP-FPM** — обработчик PHP
-   **Composer** — менеджер зависимостей PHP
-   **npm** — менеджер пакетов JavaScript

### Code Quality

-   **PHP CS Fixer** — форматирование кода
-   **PHP_CodeSniffer** — стандарты кодирования
-   **PHPUnit** — тестирование

## 🏗 Архитектура

Проект построен на принципах **Domain-Driven Design (DDD)**:

```
app/Domain/
├── User/              # Домен пользователей и аутентификации
├── Vacancy/           # Домен вакансий
├── Resume/            # Домен резюме
├── Company/           # Домен компаний
├── SharedKernel/      # Общие компоненты
└── RespondAndInteraction/  # Домен откликов
```

Каждый домен имеет структуру:

-   **Application/** — бизнес-логика (Actions, Services)
-   **Domain/** — доменные модели и правила
-   **Presentation/** — контроллеры, запросы, события

## 🚀 Быстрый старт

### Требования

-   Docker и Docker Compose
-   Git
-   Минимум 2GB свободной оперативной памяти

### Установка

1. **Клонируйте репозиторий**

    ```bash
    git clone <repository-url>
    cd MosPromHr
    ```

2. **Создайте файл окружения**

    ```bash
    cp .env.example .env
    ```

    Или создайте `.env` файл вручную со следующими параметрами:

    ```env
    APP_NAME=MosPromHr
    APP_ENV=local
    APP_KEY=
    APP_DEBUG=true
    APP_URL=http://localhost

    DB_CONNECTION=pgsql
    DB_HOST=db
    DB_PORT=5432
    DB_DATABASE=mospromhr
    DB_USERNAME=postgres
    DB_PASSWORD=postgres

    JWT_SECRET=
    ```

3. **Запустите Docker контейнеры**

    ```bash
    cd docker_mosprom
    docker-compose up -d
    ```

4. **Установите зависимости PHP**

    ```bash
    docker exec -it MosPromHr composer install
    ```

5. **Сгенерируйте ключ приложения**

    ```bash
    docker exec -it MosPromHr php artisan key:generate
    ```

6. **Сгенерируйте JWT секрет**

    ```bash
    docker exec -it MosPromHr php artisan jwt:secret
    ```

7. **Выполните миграции**

    ```bash
    docker exec -it MosPromHr php artisan migrate
    ```

8. **Заполните базу данных тестовыми данными** (опционально)

    ```bash
    docker exec -it MosPromHr php artisan db:seed
    ```

9. **Установите зависимости фронтенда**
    ```bash
    npm install
    npm run build
    ```

### Запуск для разработки

Если вы хотите запустить проект локально без Docker:

```bash
# Установите зависимости
composer install
npm install

# Настройте .env файл (укажите локальные данные БД)

# Запустите миграции
php artisan migrate --seed

# Запустите dev-окружение (сервер, очереди, логи, Vite)
composer dev
```

## 🌐 API Endpoints

### Аутентификация (`/api/auth`)

-   `POST /api/auth/register` — регистрация пользователя
-   `POST /api/auth/login` — вход в систему
-   `POST /api/auth/logout` — выход из системы _(требует авторизации)_

### Вакансии (`/api/vacancies`)

-   `GET /api/vacancies/{id}` — просмотр вакансии
-   `POST /api/vacancies` — создание вакансии _(требует авторизации)_
-   `PUT /api/vacancies/{id}` — обновление вакансии _(требует авторизации)_
-   `DELETE /api/vacancies/{id}` — удаление вакансии _(требует авторизации)_

### Резюме (`/api/resume`)

-   `GET /api/resume/{id}` — просмотр резюме
-   `POST /api/resume/store` — создание резюме _(требует авторизации)_
-   `PATCH /api/resume/update/{id}` — обновление резюме _(требует авторизации)_
-   `DELETE /api/resume/delete/{id}` — удаление резюме _(требует авторизации)_

## 🗄 Структура базы данных

### Основные таблицы:

-   `users` — пользователи системы
-   `companies` — компании-работодатели
-   `vacancies` — вакансии
-   `resumes` — резюме соискателей
-   `skills` — навыки
-   `professions` — профессии
-   `industries` — отрасли
-   `responds` — отклики на вакансии
-   `experiences` — опыт работы
-   `education` — образование

## 🔒 Авторизация

Проект использует **Laravel Sanctum** для API-токенов. Для доступа к защищённым эндпоинтам:

1. Получите токен через `/api/auth/login`
2. Добавьте заголовок в запросы:
    ```
    Authorization: Bearer {your-token}
    ```

## 🧪 Тестирование

```bash
# Запуск всех тестов
composer test

# Или через Docker
docker exec -it MosPromHr php artisan test
```

## 📊 Линтинг и форматирование кода

```bash
# PHP CS Fixer
vendor/bin/php-cs-fixer fix

# PHP_CodeSniffer
vendor/bin/phpcs
vendor/bin/phpcbf  # автоисправление
```

## 🐳 Docker контейнеры

Проект использует три основных контейнера:

-   **MosPromHr** (PHP-FPM 8.2) — приложение
-   **MosPromHrDb** (PostgreSQL) — база данных
-   **MosPromHrNginx** — веб-сервер

### Полезные команды:

```bash
# Просмотр логов
docker-compose logs -f

# Остановка контейнеров
docker-compose down

# Пересборка контейнеров
docker-compose up -d --build

# Вход в контейнер PHP
docker exec -it MosPromHr bash

# Вход в PostgreSQL
docker exec -it MosPromHrDb psql -U postgres -d mospromhr
```

## 📝 Сидеры

Проект включает сидеры для быстрого наполнения базы тестовыми данными:

-   `UsersSeeder` — пользователи
-   `CompaniesSeeder` — компании
-   `VacanciesSeeder` — вакансии
-   `ResumesSeeder` — резюме
-   `SkillsSeeder` — навыки
-   `ProfessionsSeeder` — профессии
-   `IndustriesSeeder` — отрасли

## 🤝 Разработка

### Создание нового домена

1. Создайте структуру папок в `app/Domain/{DomainName}/`
2. Добавьте файл маршрутов `Presentation/routes.php`
3. Подключите маршруты в `routes/api.php`
4. Следуйте принципам DDD и текущей архитектуре

### Стандарты кода

Проект следует стандартам:

-   PSR-12 (Extended Coding Style)
-   Strict types (`declare(strict_types=1)`)
-   Slevomat Coding Standard

## 📄 Лицензия

MIT License

## 👥 Команда

Проект разработан для автоматизации процессов HR и рекрутинга в МосПром.

---

**Примечание:** После первого запуска приложение будет доступно по адресу `http://localhost`
