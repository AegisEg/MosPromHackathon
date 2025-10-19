<?php
declare(strict_types=1);

use App\Enums\RespondType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up(): void {
        Schema::table('chats', function (Blueprint $table) {
            // Удаляем FK на responds, так как respond_id теперь может ссылаться также на internship_responds
            try {
                $table->dropForeign(['respond_id']);
            } catch (Throwable $e) {
                // ignore if FK name differs or not exists
            }

            // Удаляем уникальный индекс только по respond_id (если есть)
            try {
                $table->dropUnique('chats_respond_id_unique');
            } catch (Throwable $e) {
                // ignore
            }

            // Добавляем тип ответа: 0 — vacancy responds, 1 — internship responds
            $table->tinyInteger('respond_type')->default(RespondType::VACANCY->value)->after('respond_id');

            // Новый составной уникальный индекс: (respond_id, respond_type)
            $table->unique(['respond_id', 'respond_type'], 'chats_respond_id_type_unique');
        });
    }

    public function down(): void {
        Schema::table('chats', function (Blueprint $table) {
            // Удаляем составной индекс
            try {
                $table->dropUnique('chats_respond_id_type_unique');
            } catch (Throwable $e) {
                // ignore
            }

            // Возвращаем старый уникальный индекс
            $table->unique('respond_id');

            // Удаляем колонку типа
            $table->dropColumn('respond_type');

            // Возвращаем FK на responds
            $table->foreign('respond_id')->references('id')->on('responds')->cascadeOnDelete();
        });
    }
};
