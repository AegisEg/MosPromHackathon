<?php
declare(strict_types=1);

namespace App\Domain\Connection\Application\Action;

use App\Domain\Connection\Application\DTO\ChatOutputDTO;
use App\Domain\Connection\Application\DTO\ChatMessageDTO;
use App\Domain\Connection\Application\DTO\ChatMessageFileDTO;
use App\Domain\Connection\Application\Exceptions\ChatNotFoundException;
use App\Domain\Connection\Application\Exceptions\ForbiddenChatException;
use App\Enums\UserRole;
use App\Models\Chat;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Throwable;

class ChatAction
{
    /**
     * Получить сообщения чата
     * @return ChatMessageDTO[]
     */
    public function showMessages(int $chatId, User $user): array {
        $chat = Chat::with(['respond.resume', 'respond.vacancy'])->find($chatId);

        if (!$chat) {
            throw new ChatNotFoundException();
        }

        $companyUserId = $chat->respond->vacancy->company->user_id ?? null;

        if (($chat->respond->resume->user_id ?? null) !== $user->id && $companyUserId !== $user->id) {
            throw new ForbiddenChatException();
        }

        $messages = $chat->messages()
            ->with(['user:id,first_name,last_name,middle_name', 'files:id,chat_message_id,path,original_name,size,mime_type'])
            ->orderBy('created_at')
            ->get(['id', 'chat_id', 'user_id', 'text', 'created_at']);

        return $messages->map(static function ($m) {
            $files = $m->files->map(static fn ($f) => new ChatMessageFileDTO(
                path: asset(Storage::url($f->path)),
                originalName: $f->original_name,
                size: $f->size,
                mimeType: $f->mime_type,
            ))->toArray();

            return (new ChatMessageDTO(
                id: $m->id,
                text: $m->text,
                createdAt: $m->created_at->format(\DateTime::ATOM),
                userId: $m->user?->id,
                userName: $m->user ? ($m->user->last_name.' '.$m->user->first_name) : null,
                files: $files,
            ))->toArray();
        })->toArray();
    }

    /**
     * Получить список чатов
     * @return ChatOutputDTO[]
     */
    public function chatList(User $user): array {
        $query = Chat::query()->with(['respond.resume', 'respond.vacancy']);

        if ($user->role === UserRole::JOB_SEEKER) {
            $query->whereHas('respond.resume', function ($q) use ($user) {
                $q->where('user_id', '=', $user->id);
            });
        } elseif ($user->role === UserRole::EMPLOYER) {
            $query->whereHas('respond.vacancy.company', function ($q) use ($user) {
                $q->where('user_id', '=', $user->id);
            });
        }

        $chats = $query->get();

        $chatOutputDTOs = [];

        foreach ($chats as $chat) {
            $chat->lastMessage = $chat->messages()->latest()->first();

            if ($user->role === UserRole::JOB_SEEKER) {
                $title = $chat->respond->vacancy->company->name.': '.$chat->respond->vacancy->title;
            } else {
                $title = $chat->respond->vacancy->title .': '. $chat->respond->resume->user->last_name.' '.$chat->respond->resume->user->first_name;
            }
            $chatOutputDTOs[] = new ChatOutputDTO(
                id: $chat->id,
                title: $title,
                lastMessage: $chat->lastMessage?->text ?? '',
            );
        }

        return $chatOutputDTOs;
    }

    public function createChat(int $respondId): int {
        try {
            DB::beginTransaction();
            $chat = Chat::create([
                'respond_id' => $respondId,
            ]);
            DB::commit();
        } catch (Throwable $e) {
            DB::rollBack();
            throw $e;
        }

        return $chat->id;
    }

    public function sendMessage(int $chatId, string $text, array $files, User $user): ChatMessageDTO {
        $chat = Chat::find($chatId);

        if (!$chat) {
            throw new ChatNotFoundException();
        }
        try {
            DB::beginTransaction();
            $message = $chat->messages()->create([
                'user_id' => $user->id,
                'text'    => $text,
            ]);
            $filesDTO = [];

            foreach ($files as $file) {
                // $file — это UploadedFile
                $storedPath = $file->store('public/chat/'.$chat->id);
                $message->files()->create([
                    'path'          => $storedPath,
                    'original_name' => $file->getClientOriginalName(),
                    'size'          => $file->getSize(),
                    'mime_type'     => $file->getClientMimeType(),
                ]);
                $filesDTO[] = new ChatMessageFileDTO(
                    path: asset(Storage::url($storedPath)),
                    originalName: $file->getClientOriginalName(),
                    size: $file->getSize(),
                    mimeType: $file->getClientMimeType(),
                );
            }
            DB::commit();
        } catch (Throwable $e) {
            DB::rollBack();
            throw $e;
        }

        return new ChatMessageDTO(
            id: $message->id,
            text: $message->text,
            createdAt: (string) $message->created_at,
            userId: $user->id,
            userName: $user->last_name.' '.$user->first_name,
            files: $filesDTO,
        );
    }

    public function updateChatMessages(int $chatId, int $lastMessageId, User $user): array {
        $chat = Chat::find($chatId);

        if (!$chat) {
            throw new ChatNotFoundException();
        }

        $companyUserId = $chat->respond->vacancy->company->user_id ?? null;

        if (($chat->respond->resume->user_id ?? null) !== $user->id && $companyUserId !== $user->id) {
            throw new ForbiddenChatException();
        }

        $messages = $chat->messages()->where('id', '>', $lastMessageId)->get();

        return $messages->map(static function ($m) {
            return new ChatMessageDTO(
                id: $m->id,
                text: $m->text,
                createdAt: $m->created_at->format(\DateTime::ATOM),
                userId: $m->user?->id,
                userName: $m->user ? ($m->user->last_name.' '.$m->user->first_name) : null,
                files: $m->files->map(static fn ($f) => new ChatMessageFileDTO(
                    path: asset(Storage::url($f->path)),
                    originalName: $f->original_name,
                    size: $f->size,
                    mimeType: $f->mime_type,
                ))->toArray(),
            );
        })->toArray();
    }
}
