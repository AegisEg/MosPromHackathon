<?php
declare(strict_types=1);

namespace App\Domain\Connection\Application\Listeners;

use App\Domain\Internship\Presentation\Events\NewInternshipRespondEvent;
use App\Enums\RespondType;
use App\Models\Chat;
use Illuminate\Support\Facades\DB;
use Throwable;

class CreateChatForInternshipListener
{
    public function handle(NewInternshipRespondEvent $event): void {
        try {
            DB::beginTransaction();
            Chat::firstOrCreate([
                'respond_id'   => $event->respondId,
                'respond_type' => RespondType::INTERNSHIP->value,
            ]);
            DB::commit();
        } catch (Throwable $e) {
            DB::rollBack();
            throw $e;
        }
    }
}


