# Internship Domain

Домен для управления стажировками в системе MosPromHr.

## Структура

### Application Layer

-   **Action/InternshipAction.php** - бизнес-логика для работы со стажировками
-   **DTO/ShowInternshipDTO.php** - DTO для отображения данных стажировки
-   **Exceptions/** - исключения домена (InternshipNotFoundException, ForbiddenInternshipException)

### Presentation Layer

-   **Controllers/InternshipController.php** - контроллер для обработки HTTP-запросов
-   **Requests/** - валидация входящих данных (CreateInternshipRequest, UpdateInternshipRequest)
-   **Events/** - события домена (ShowInternshipEvent, CreateInternshipEvent, UpdateInternshipEvent)
-   **routes.php** - маршруты API

## API Endpoints

-   `GET /api/internships/{id}` - получить стажировку по ID
-   `POST /api/internships` - создать новую стажировку
-   `PUT /api/internships/{id}` - обновить стажировку
-   `DELETE /api/internships/{id}` - удалить стажировку

Все endpoints требуют аутентификации (`auth:api` middleware).
