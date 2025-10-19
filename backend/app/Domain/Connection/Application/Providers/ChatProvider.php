<?php
declare(strict_types=1);

namespace App\Domain\Connection\Application\Providers;

use App\Domain\Connection\Application\Listeners\CreateChatListener;
use App\Domain\Connection\Application\Listeners\CreateChatForInternshipListener;
use App\Domain\Vacancy\Presentation\Events\NewRespondEvent;
use App\Domain\Internship\Presentation\Events\NewInternshipRespondEvent;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider;

class ChatProvider extends ServiceProvider
{
    public function boot(): void {
        Event::listen(NewRespondEvent::class, [CreateChatListener::class, 'handle']);
        Event::listen(NewInternshipRespondEvent::class, [CreateChatForInternshipListener::class, 'handle']);
    }
}
