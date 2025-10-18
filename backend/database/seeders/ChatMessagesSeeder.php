<?php
declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Chat;
use App\Models\ChatMessage;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ChatMessagesSeeder extends Seeder
{
    public function run(): void {
        $chatIds = Chat::query()->pluck('id')->all();
        $userIds = User::query()->pluck('id')->all();

        if (empty($chatIds) || empty($userIds)) {
            return;
        }

        DB::transaction(function () use ($chatIds, $userIds) {
            foreach ($chatIds as $chatId) {
                $count = rand(3, 10);

                for ($i = 0; $i < $count; $i++) {
                    ChatMessage::create([
                        'chat_id' => $chatId,
                        'user_id' => $userIds[array_rand($userIds)],
                        'text'    => fake()->boolean(80) ? fake()->sentence(12) : null,
                    ]);
                }
            }
        });
    }
}
