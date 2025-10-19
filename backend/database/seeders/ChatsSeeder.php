<?php
declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Chat;
use App\Models\Responds;
use App\Models\InternshipRespond;
use App\Enums\RespondType;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ChatsSeeder extends Seeder
{
    public function run(): void {
        $respondIds           = Responds::query()->pluck('id')->all();
        $internshipRespondIds = InternshipRespond::query()->pluck('id')->all();

        if (empty($respondIds) && empty($internshipRespondIds)) {
            return;
        }

        DB::transaction(function () use ($respondIds, $internshipRespondIds) {
            // Отклики на вакансии
            foreach ($respondIds as $respondId) {
                Chat::firstOrCreate([
                    'respond_id'   => $respondId,
                    'respond_type' => RespondType::VACANCY->value,
                ]);
            }

            // Отклики на стажировки
            foreach ($internshipRespondIds as $respondId) {
                Chat::firstOrCreate([
                    'respond_id'   => $respondId,
                    'respond_type' => RespondType::INTERNSHIP->value,
                ]);
            }
        });
    }
}
