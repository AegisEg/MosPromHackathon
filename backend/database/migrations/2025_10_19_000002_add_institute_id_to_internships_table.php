<?php
declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up(): void {
        Schema::table('internships', function (Blueprint $table) {
            $table->foreignId('institute_id')->nullable()->after('user_id')->constrained('users')->nullOnDelete();
        });
    }

    public function down(): void {
        Schema::table('internships', function (Blueprint $table) {
            $table->dropConstrainedForeignId('institute_id');
        });
    }
};
