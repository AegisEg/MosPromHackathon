<?php
declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Chat;
use App\Models\ChatMessage;
use App\Models\Responds;
use App\Models\InternshipRespond;
use App\Enums\RespondType;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ChatMessagesSeeder extends Seeder
{
    public function run(): void {
        $chats = Chat::query()->get();

        if ($chats->isEmpty()) {
            return;
        }

        DB::transaction(function () use ($chats) {
            foreach ($chats as $chat) {
                $participantIds = [];

                if ($chat->respond_type === RespondType::VACANCY->value) {
                    $respond = Responds::with(['resume', 'vacancy.company'])->find($chat->respond_id);

                    if ($respond) {
                        if ($respond->resume?->user_id) {
                            $participantIds[] = (int) $respond->resume->user_id;
                        }

                        if ($respond->vacancy?->company?->user_id) {
                            $participantIds[] = (int) $respond->vacancy->company->user_id;
                        }
                    }
                } elseif ($chat->respond_type === RespondType::INTERNSHIP->value) {
                    $ir = InternshipRespond::with(['company', 'internship'])->find($chat->respond_id);

                    if ($ir) {
                        if ($ir->company?->user_id) {
                            $participantIds[] = (int) $ir->company->user_id;
                        }
                        // институт может быть указан в поле institute_id, иначе владелец записи user_id
                        $instituteUserId = $ir->internship?->institute_id ?: $ir->internship?->user_id;

                        if ($instituteUserId) {
                            $participantIds[] = (int) $instituteUserId;
                        }
                    }
                }

                $participantIds = array_values(array_unique(array_filter($participantIds)));

                if (count($participantIds) === 0) {
                    continue;
                }

                $count = rand(3, 10);

                for ($i = 0; $i < $count; $i++) {
                    ChatMessage::create([
                        'chat_id' => $chat->id,
                        'user_id' => $participantIds[array_rand($participantIds)],
                        'text'    => fake()->boolean(80) ? fake()->sentence(12) : null,
                    ]);
                }
            }
        });
    }
}
