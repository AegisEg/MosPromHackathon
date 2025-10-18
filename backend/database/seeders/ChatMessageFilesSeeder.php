<?php
declare(strict_types=1);

namespace Database\Seeders;

use App\Models\ChatMessage;
use App\Models\ChatMessageFile;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ChatMessageFilesSeeder extends Seeder
{
    public function run(): void {
        $messageIds = ChatMessage::query()->pluck('id')->all();

        if (empty($messageIds)) {
            return;
        }

        $mimePool = ['application/pdf', 'image/png', 'image/jpeg', 'application/zip'];

        DB::transaction(function () use ($messageIds, $mimePool) {
            foreach ($messageIds as $messageId) {
                $count = rand(0, 3);

                for ($i = 0; $i < $count; $i++) {
                    ChatMessageFile::create([
                        'chat_message_id' => $messageId,
                        'path'            => 'public/chat/'.uniqid().'.dat',
                        'original_name'   => fake()->filePath(),
                        'size'            => rand(5_000, 3_000_000),
                        'mime_type'       => $mimePool[array_rand($mimePool)],
                    ]);
                }
            }
        });
    }
}
