<?php
declare(strict_types=1);

namespace App\Domain\Connection\Application\Listeners;

use App\Domain\Connection\Application\Action\ChatAction;
use App\Domain\Vacancy\Presentation\Events\NewRespondEvent;

class CreateChatListener
{
    /**
     * Create the event listener.
     */
    public function __construct() {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(NewRespondEvent $event): void {
        (new ChatAction())->createChat($event->respondId);
    }
}
