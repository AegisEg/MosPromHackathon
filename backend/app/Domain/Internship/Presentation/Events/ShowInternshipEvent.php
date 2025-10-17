<?php
declare(strict_types=1);

namespace App\Domain\Internship\Presentation\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ShowInternshipEvent
{
    use Dispatchable;
    use InteractsWithSockets;
    use SerializesModels;

    public function __construct(public int $internshipId) {}
}
