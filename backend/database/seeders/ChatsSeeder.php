<?php
declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Chat;
use App\Models\Responds;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ChatsSeeder extends Seeder
{
    public function run(): void {
        $respondIds = Responds::query()->pluck('id')->all();

        if (empty($respondIds)) {
            return;
        }

        DB::transaction(function () use ($respondIds) {
            // По одному чату на отклик
            foreach ($respondIds as $respondId) {
                Chat::firstOrCreate(['respond_id' => $respondId]);
            }
        });
    }
}
